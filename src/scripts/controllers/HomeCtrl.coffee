angular = require 'angular'
Trianglify = require 'trianglify'

animationEnabled = true

angular.module 'site.controllers.home', ['ngMaterial', 'site.services']
.controller 'HomeCtrl', ($scope, Background) ->
    $scope.backgroundStyle =
        'background-image': "url(#{Background.generate 'Home'})"
        'background-attachment': 'fixed'

    $scope.animationEnabled = if animationEnabled then 'animated' else ''

    if animationEnabled
        getButtons().addClass 'button-disabled'
        getLastLine().addEventListener 'animationend', ->
            getButtons().removeClass 'button-disabled'

        getLastButton().addEventListener 'animationend', ->
            $scope.animationEnabled = ''
            animationEnabled = false

.config ($stateProvider) ->
    $stateProvider
    .state 'home',
        url: '/home'
        templateUrl: 'home/home.html'
        controller: 'HomeCtrl'
        
getButtons = ->
    angular.element document.querySelectorAll '.home .main .buttons .button'

getLastButton = ->
    results = getButtons()
    results[results.length - 1]

getLastLine = ->
    results = document.querySelectorAll '.home .main .description .line'
    results[results.length - 1]
