angular = require 'angular'
Trianglify = require 'trianglify'

animationEnabled = true

angular.module 'site.controllers.home', ['ngMaterial', 'site.services']
.controller 'HomeCtrl', ($scope, Background) ->
    $scope.backgroundStyle =
        'background-image': "url(#{Background.generate 'Home'})"
        'background-attachment': 'fixed'

    $scope.animationEnabled = if animationEnabled then 'animated' else ''

    setTimeout ->
        $scope.animationEnabled = ''
        animationEnabled = false
    , 4000
