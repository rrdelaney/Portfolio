angular = require 'angular'

angular.module 'site.services'
.service 'blogPostLoader', ->
    @loadPosts = ->
        blogPostTemplates = (angular.element(node.content) for node in document.querySelectorAll 'template.blog-post')

        for post in blogPostTemplates
            metadata = {}
            for attr in post[0].firstChild.attributes
                metadata[attr.name] = attr.value

            content: post[0]
            metadata: metadata

    return
