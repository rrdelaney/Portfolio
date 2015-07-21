angular = require 'angular'

animationEnabled = true

angular.module 'site.controllers'
.controller 'HomeCtrl', ($scope, blogPostLoader) ->
    console.log blogPostLoader.loadPosts()

    $scope.animationEnabled = if animationEnabled then 'animated' else ''

    setTimeout ->
        $scope.animationEnabled = ''
        animationEnabled = false
    , 4000
