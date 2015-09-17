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
    .state 'resume',
        url: '/resume'
        templateUrl: 'resume/resume.html'

    $urlRouterProvider.otherwise 'home'

.config ($mdThemingProvider, $mdIconProvider) ->
    $mdThemingProvider.theme 'default'
    .primaryPalette 'teal'
    .accentPalette 'deep-purple'

    $mdIconProvider
    .defaultFontSet 'fa'
