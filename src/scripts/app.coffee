angular = require 'angular'
require 'angular-ui-router'
require 'angular-animate'
require 'angular-aria'
require 'angular-material'
require 'angular-template-tag'
require './controllers'

angular.module 'site', ['ui.router'
                        'templateTag'
                        'ngMaterial'
                        'site.controllers']

.config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'home',
        url: '/home'
        templateUrl: 'home/home'
        controller: 'HomeCtrl'

    .state 'blog',
        url: '/blog'
        template: '<p>Future Blog!</p>'

    .state 'resume',
        url: '/resume'
        templateUrl: 'resume/resume'

    $urlRouterProvider.otherwise 'home'
