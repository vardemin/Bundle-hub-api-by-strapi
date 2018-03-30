'use strict';
/**
 * Lifecycle callbacks for the `Source` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model, attrs, options) => {
  //   console.log(model);
  //   console.log(attrs);
  //   console.log(options);
  // },

  // After saving a value.
  // Fired after an `insert` or `update` query.
  afterSave: async (model, result, options) => {
    var fetchUrl = require("fetch").fetchUrl;
    var _ = require('lodash');
    await fetchUrl(model.url, function (error, meta, body) {
      if (!error && meta.status == 200) {
        var txt = body;
        var lines = txt.toString().split('\n');
        model.keys = [];
        for(var line = 0; line < lines.length; line++){
          if (!_.isEmpty(lines[line])) {
            strapi.log.info(lines[line]);
            const data = strapi.services.key.add({"key": lines[line], "source": model.id});
            
            model.keys.push(data._id);
          }
        }
      }
    });
  },

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {},

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
