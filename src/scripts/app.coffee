angular = require 'angular'
require 'angular-ui-router'
require 'angular-bootstrap'

angular.module 'site', ['ui.router'
                       'ui.bootstrap']

.config ($stateProvider, $urlRouterProvider) ->
    $stateProvider.state 'home',
        url: '/home'
        template: require '../templates/home/layout.jade'
        abstract: yes

    .state 'home.index',
        url: ''
        views:
            content:
                template: require '../templates/home/home.jade'

    .state 'home.blog',
        url: '/blog'
        views:
            content:
                template: '<p>Future Blog!</p>'

    $urlRouterProvider.otherwise 'home'