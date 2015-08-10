angular = require 'angular'

animationEnabled = true

angular.module 'site.controllers.home', ['ngMaterial']
.controller 'HomeCtrl', ($scope, $mdSidenav, $mdMedia) ->
    $scope.toggleSidenav = ->
        $mdSidenav('right').toggle()

    $scope.isSmall = -> $mdMedia 'sm'

    $scope.animationEnabled = if animationEnabled then 'animated' else ''

    setTimeout ->
        $scope.animationEnabled = ''
        animationEnabled = false
    , 4000
