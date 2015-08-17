angular = require 'angular'

angular.module 'site.controllers.blog', ['site.services']
.controller 'BlogCtrl', ($scope, BlogPostLoader, Background) ->
    $scope.backgroundStyle =
        'background-image': "url(#{Background.generate 'BlogHome', undefined, 'reverse'})"
        'background-attachment': 'fixed'

    $scope.blogPosts = BlogPostLoader.loadPosts 'template.blog-post'

    $scope.revealPost = (id) ->
        $scope.blogPosts[id].revealed = true
