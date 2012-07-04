// Set the require.js configuration for your application.
require.config({
  baseUrl: '/assets',
  urlArgs: "bust=" + (new Date()).getTime(),

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    //libs: "../assets/js/libs",
    //plugins: "../assets/js/plugins",

    // Libraries.
    jquery: "jquery",
    lodash: "lodash",
    backbone: "backbone",
    mustache: 'mustache'
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"]
  }

});
