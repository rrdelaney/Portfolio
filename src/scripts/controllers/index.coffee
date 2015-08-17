angular = require 'angular'
require './HomeCtrl'
require './BlogCtrl'

angular.module 'site.controllers', ['site.controllers.home'
                                    'site.controllers.blog']
