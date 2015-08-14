angular = require 'angular'

angular.module 'site.services'
.service 'BlogPostLoader', ($sce) ->
    @loadPosts = (query) ->
        for post, index in document.querySelectorAll query
            element = angular.element(post.content)
            metadata = {}
            for attr in element[0].firstChild.attributes
                metadata[attr.name] = attr.value

            id: index
            content: $sce.trustAsHtml post.innerHTML
            metadata: metadata

    return
