define([
  // Libraries.
  "jquery",
  "lodash",
  "backbone",
  'mustache',

  // Plugins.
  "plugins/backbone.layoutmanager",

  'templates/layouts/main'
],

function($, _, Backbone) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/"
  };

  // Localize or create a new JavaScript Template object.
  //var JST = window.JST = window.JST || {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    paths: {
      layout: "assets/templates/layouts/",
      template: "assets/templates/"
    },

    fetch: function(path) {
      //path = path + ".js";

      if (!JST[path]) {
        $.ajax({ url: "/" + path, async: false, dataType: 'html' }).then(function(contents) {
          //JST[path] = contents;
          eval(contents);
        });
      }

      return JST[path];
    },

    render: function(template, context) {
      return Mustache.to_html(template, context);
    }
  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name) {
      // If already using this Layout, then don't re-inject into the DOM.
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }

      // If a layout already exists, remove it from the DOM.
      if (this.layout) {
        this.layout.remove();
      }

      // Create a new Layout.
      var layout = new Backbone.Layout({
        template: name,
        className: "layout " + name,
        id: "layout"
      });

      // Insert into the DOM.
      $("#main").empty().append(layout.el);

      // Render the layout.
      layout.render();

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability.
      return layout;
    }
  }, Backbone.Events);

});
