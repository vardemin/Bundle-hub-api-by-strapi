'use strict';

/**
 * Cart.js controller
 *
 * @description: A set of functions called "actions" for managing `Cart`.
 */

module.exports = {

  /**
   * Retrieve cart records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.cart.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a cart record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.cart.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an cart record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.cart.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an cart record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.cart.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an cart record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.cart.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
