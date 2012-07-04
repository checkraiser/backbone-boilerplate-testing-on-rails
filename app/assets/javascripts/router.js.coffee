define [
  # Application.
  "app",

  'modules/contact'
],

(app, Contact) ->

  # Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend
    routes:
      "": "index"

    index: ->
      app.useLayout('main').render()

    initialize: ->
      @contacts = new Contact.Collection()
      @contacts.fetch()

      app.useLayout('main')

      app.layout.setViews
        '.contacts': new Contact.Views.List
          collection: @contacts
