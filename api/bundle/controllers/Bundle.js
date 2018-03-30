'use strict';

/**
 * Bundle.js controller
 *
 * @description: A set of functions called "actions" for managing `Bundle`.
 */

module.exports = {

  /**
   * Retrieve bundle records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.bundle.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a bundle record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.bundle.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an bundle record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.bundle.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an bundle record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.bundle.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an bundle record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.bundle.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },
  buy: async(ctx) => {
    var _ = require('lodash');
    console.log(ctx.request.body);
    if (_.isEmpty(ctx.request.body.items) || !ctx.request.body.user) {
      ctx.throw(400, 'Wrong params');
    }
    var ids = [];
    var keys = [];
    var games = new Set();
    var purchaseList = [];
    
    for (var _item in ctx.request.body.items) {
      var item = ctx.request.body.items[_item];
      console.log(item);
      const bundle = await strapi.services.bundle.fetch({"_id": item.id});

      for (var i = 0; i < bundle.games.length; i++) {
        var game = bundle.games[i];
        if (!games.has(game.id)) {
          games.add(game.id);
          purchaseList.push({"game": game.id, "amount": item.amount});
        }
        else {
          _.unionWith([{"game": game.id, "amount": item.amount}], purchaseList , function(objValue, srcValue){
            if (objValue.game === srcValue.game) {
              objValue.amount += srcValue.amount;
              return true;
            }
            else return false;
          })
          console.log(purchaseList);
        }
      }
    }
    
    var packs = []
    var length = purchaseList.length;
    for (var i = 0; i < length; i++) {
        var purchase = purchaseList[i];
        var pack = await strapi.services.pack.add({});
        var source = await strapi.services.source.fetchAll({game: purchase.game})
        var keys = _.take(_.filter(source[0].keys, function(o) { return !o.purchased;}),purchase.amount);
        console.log("keys");
        console.log(keys);
        var date = new Date();
        for (var j = 0; j < keys.length; j++) {
          //await strapi.services.key.edit({_id: keys[j].id},{purchased: true, purchasedAt: date});
          keys[j].purchased = true;
          keys[j].purchasedAt = date;
        }
        pack.game = purchase.game;
        pack.keys_pack = [];
        pack.keys_pack.push(keys);
        packs.push(pack);
        console.log("pack");
        console.log(pack);
        await strapi.services.pack.edit({_id: pack.id},{game: purchase.game, keys_pack: keys, user_packs: ctx.request.body.user});
    }
    ctx.send(packs);
  }
};
