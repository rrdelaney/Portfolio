angular = require 'angular'

angular.module 'site.controllers.blog', []
.controller 'BlogCtrl', ($scope, BlogPostLoader) ->
    $scope.blogPosts = BlogPostLoader.loadPosts 'template.blog-post'
