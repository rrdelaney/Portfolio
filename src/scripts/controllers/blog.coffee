angular = require 'angular'

angular.module 'site.controllers.blog', ['site.services']
.controller 'BlogCtrl', ($scope, BlogPostLoader, Background) ->
    $scope.backgroundStyle =
        'background-image': "url(#{Background.generate 'BlogHome', undefined, 'reverse'})"

    $scope.blogPosts = BlogPostLoader.loadPosts 'template.blog-post'

    $scope.revealPost = (id) -> console.log "Revealing #{id}!"
