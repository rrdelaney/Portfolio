angular = require 'angular'
require 'angular-ui-router'
require 'angular-animate'
require 'angular-aria'
require 'angular-material'
require 'angular-template-tag'
require './services'
require './controllers'

angular.module 'site', ['ui.router'
                        'templateTag'
                        'ngMaterial'
                        'site.services'
                        'site.controllers']

.config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'home',
        url: '/home'
        templateUrl: 'home/home'
        controller: 'HomeCtrl'

    .state 'blog',
        url: '/blog'
        templateUrl: 'blog/blog'
        controller: 'BlogCtrl'

    .state 'resume',
        url: '/resume'
        templateUrl: 'resume/resume'

    $urlRouterProvider.otherwise 'home'

.config ($mdThemingProvider) ->
   $mdThemingProvider.theme 'default'
   .primaryPalette 'teal'
   .accentPalette 'deep-purple'
