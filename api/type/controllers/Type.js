'use strict';

/**
 * Type.js controller
 *
 * @description: A set of functions called "actions" for managing `Type`.
 */

module.exports = {

  /**
   * Retrieve type records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.type.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a type record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.type.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an type record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.type.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an type record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.type.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an type record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.type.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
