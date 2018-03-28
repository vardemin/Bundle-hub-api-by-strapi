'use strict';

/**
 * Source.js controller
 *
 * @description: A set of functions called "actions" for managing `Source`.
 */

module.exports = {

  /**
   * Retrieve source records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.source.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a source record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.source.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an source record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.source.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an source record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.source.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an source record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.source.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
