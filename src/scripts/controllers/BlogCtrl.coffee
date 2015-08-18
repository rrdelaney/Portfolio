angular = require 'angular'

angular.module 'site.controllers.blog', ['site.services']
.controller 'BlogCtrl', ($scope, BlogPostLoader, Background) ->
    $scope.backgroundStyle = {}

    $scope.blogPosts = BlogPostLoader.loadPosts 'template.blog-post'

.controller 'BlogListCtrl', ($scope, Background) ->
    $scope.$parent.backgroundStyle =
        'background-image': "url(#{Background.generate 'BlogHome', undefined, 'reverse'})"
        'background-attachment': 'fixed'

    $scope.revealPost = (id) ->
        $scope.blogPosts[id].revealed = true

    $scope.searchQuery = ''
    $scope.filterPosts = (searchTerm) ->
        for post in $scope.blogPosts
            hidePost = true
            for tag in post.tags
                if tag.indexOf(searchTerm) isnt -1 then hidePost = false

            post.hidden = hidePost

.controller 'BlogPostCtrl', ($scope, $stateParams, $state, Background) ->
    $scope.slug = $stateParams.slug

    $scope.$parent.backgroundStyle =
        'background-image': "url(#{Background.generate $scope.slug, undefined, 'reverse'})"
        'background-attachment': 'fixed'

    $scope.post = do ->
        posts = $scope.blogPosts.filter (post) -> post.slug is $scope.slug
        if posts.length is 0 then $state.go 'blog.list'
        posts[0]

.config ($stateProvider) ->
    $stateProvider
    .state 'blog',
        abstract: true
        url: '/blog'
        templateUrl: 'blog/blog.html'
        controller: 'BlogCtrl'

    .state 'blog.list',
        url: ''
        controller: 'BlogListCtrl'
        templateUrl: 'blog/list.html'

    .state 'blog.post',
        url: '/:slug'
        templateUrl: 'blog/post.html'
        controller: 'BlogPostCtrl'
