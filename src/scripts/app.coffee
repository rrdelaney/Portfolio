angular = require 'angular'
require 'angular-ui-router'
require 'angular-animate'
require 'angular-aria'
require 'angular-material'
require './controllers'

angular.module 'site', ['ui.router'
                        'ngMaterial'
                        'site.controllers']

.config ($stateProvider, $urlRouterProvider) ->
    $stateProvider.state 'home',
        url: '/home'
        template: require '../templates/home/home.jade'

    .state 'blog',
        url: '/blog'
        template: '<p>Future Blog!</p>'

    .state 'resume',
        url: '/resume'
        template: require '../templates/resume/resume.jade'

    $urlRouterProvider.otherwise 'home'
