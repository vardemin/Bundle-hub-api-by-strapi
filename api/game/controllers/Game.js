'use strict';

/**
 * Game.js controller
 *
 * @description: A set of functions called "actions" for managing `Game`.
 */

module.exports = {

  /**
   * Retrieve game records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.game.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a game record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.game.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an game record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.game.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an game record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.game.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an game record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.game.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
