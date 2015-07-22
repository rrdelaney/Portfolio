angular = require 'angular'

angular.module 'site.services'
.service 'blogPostLoader', ->
    @loadPosts = ->
        blogPostTemplates = (angular.element(node.content) for node in document.querySelectorAll 'template.blog-post')
        for post in blogPostTemplates
            content: post[0]
            metadata: ([name, value] for name, value in post[0].firstChild.attributes)

    return
