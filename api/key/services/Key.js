'use strict';

/**
 * Key.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all keys.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('key', params);

    return Key
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.key.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an key.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Key
      .findOne(_.pick(params, _.keys(Key.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.key.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an key.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Key.create(_.omit(values, _.keys(_.groupBy(strapi.models.key.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('key', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an key.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('key', _.merge(_.clone(params), { values }));
    return Key.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an key.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Key.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.key.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Key.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};
