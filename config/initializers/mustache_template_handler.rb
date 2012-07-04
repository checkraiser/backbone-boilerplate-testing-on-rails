#module MustacheTemplateHandler
  #def self.call(template)
    #if template.locals.include? :mustache
      #"Mustache.render(#{template.source.inspect}, mustache).html_safe"
    #else
      #"#{template.source.inspect}.html_safe"
    #end
  #end
#end
#ActionView::Template.register_template_handler(:mustache, MustacheTemplateHandler)

class MustacheTemplateHandler < Tilt::Template
  def self.default_mime_type
    "application/javascript"
  end

  def prepare
  end

  def evaluate(scope, locals, &block)
    "JST['assets/#{scope.logical_path}'] = #{data.to_json}"
  end
end

Rails.application.assets.register_engine 'mustache', MustacheTemplateHandler
