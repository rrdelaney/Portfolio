angular = require 'angular'

angular.module 'site.services'
.service 'BlogPostLoader', ($sce) ->
    @loadPosts = (query) ->
        for post, index in document.querySelectorAll query
            element = angular.element(post.content)
            postData = {}
            for attr in element[0].firstChild.attributes
                postData[attr.name] = attr.value

            postData.id = index
            postData.tags = postData.tags.split ','
            postData.content = $sce.trustAsHtml post.innerHTML

            postData

    @loadPost = (query, id) ->
        @loadPosts(query)[id]

    return
