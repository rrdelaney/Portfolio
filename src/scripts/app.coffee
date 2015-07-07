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
    $stateProvider.state 'home',
        url: '/home'
        templateUrl: 'home/home.jade'

    .state 'blog',
        url: '/blog'
        template: '<p>Future Blog!</p>'

    .state 'resume',
        url: '/resume'
        templateUrl: 'resume/resume.jade'

    $urlRouterProvider.otherwise 'home'

#.config ($mdThemingProvider) ->
#    $mdThemingProvider.theme 'default'
#    .primaryPalette 'indigo'
#    .accentPalette 'teal'
