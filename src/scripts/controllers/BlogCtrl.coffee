angular = require 'angular'

angular.module 'site.controllers.blog', ['site.services']
.controller 'BlogCtrl', ($scope, BlogPostLoader, Background) ->
    $scope.backgroundStyle =
        'background-image': "url(#{Background.generate 'BlogHome', undefined, 'reverse'})"
        'background-attachment': 'fixed'

    $scope.blogPosts = BlogPostLoader.loadPosts 'template.blog-post'

    $scope.revealPost = (id) ->
        $scope.blogPosts[id].revealed = true

    $scope.searchQuery = ''
    $scope.filterPosts = (searchTerm) ->
        for post in $scope.blogPosts
            hidePost = true
            for tag in post.tags
                if tag.indexOf(searchTerm) isnt -1 then hidePost = false

            post.hidden = hidePost
