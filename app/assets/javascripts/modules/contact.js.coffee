define [
  'app',
  'backbone',
  'templates/contact/item',
  'templates/contact/list'
],

(app, Backbone) ->
  Contact = app.module()

  Contact.Model = Backbone.Model.extend()

  Contact.Collection = Backbone.Collection.extend
    model: Contact.Model

    url: '/contacts'

  Contact.Views.List = Backbone.View.extend
    template: 'contact/list'
    tagName: 'table'

    render: (manage) ->
      @collection.each (contact)->
        @insertView (new Contact.Views.Item
          model: contact)
      , @
      manage(@).render()

    initialize: ->
      @collection.on('reset', @render, @)

  Contact.Views.Item = Backbone.View.extend
    template: 'contact/item'

    tagName: 'tr'

    initialize: ->
      @model.on('change', @render, @)

    # Provide data to the template
    serialize: ->
      model: @model.toJSON()

  return Contact
