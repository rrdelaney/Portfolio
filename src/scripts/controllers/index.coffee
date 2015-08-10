angular = require 'angular'
require './home'
require './blog'

angular.module 'site.controllers', ['site.controllers.home'
                                    'site.controllers.blog']
