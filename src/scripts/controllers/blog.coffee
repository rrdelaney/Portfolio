angular = require 'angular'

angular.module 'site.controllers.blog', ['site.services']
.controller 'BlogCtrl', ($scope, BlogPostLoader, Background) ->
    $scope.backgroundURI = Background.generate 'BlogHome', undefined, 'reverse'
    $scope.blogPosts = BlogPostLoader.loadPosts 'template.blog-post'

    $scope.revealPost = (id) -> console.log "Revealing #{id}!"
