'use strict';

/**
 * Pack.js controller
 *
 * @description: A set of functions called "actions" for managing `Pack`.
 */

module.exports = {

  /**
   * Retrieve pack records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.pack.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a pack record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.pack.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an pack record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.pack.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an pack record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.pack.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an pack record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.pack.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
