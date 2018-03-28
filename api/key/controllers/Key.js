'use strict';

/**
 * Key.js controller
 *
 * @description: A set of functions called "actions" for managing `Key`.
 */

module.exports = {

  /**
   * Retrieve key records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.key.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a key record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.key.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an key record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.key.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an key record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.key.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an key record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.key.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
