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
  }
};
