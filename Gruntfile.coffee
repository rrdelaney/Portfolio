config = require './config'

module.exports = (grunt) ->
    require('time-grunt')(grunt)

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        gitinfo: {}
        js_dependencies: config.dependencies.js
        ftp_auth: config.auth?.ftp

        src_dir: config.path?.src ? 'src'
        target_dir: config.path?.target ? 'target/public_html'
        package_target: config.path?.package ? 'index.html'
        resrc_dir: config.path?.resrc ? 'resources'
        img_dir: config.path?.img ? 'img'

        browserify:
            dist:
                files:
                    '<%= target_dir %>/app.js': ['<%= src_dir %>/scripts/app.coffee']
                options:
                    transform: ['coffeeify', 'browserify-shim', 'debowerify']
                    browserifyOptions:
                        extensions: ['.coffee']

            debug:
                files:
                    '<%= target_dir %>/app.js': ['<%= src_dir %>/scripts/app.coffee']
                options:
                    transform: ['coffeeify', 'browserify-shim']
                    external: '<%= js_dependencies %>'
                    browserifyOptions:
                        extensions: ['.coffee']
                        debug: yes

            libs:
                dest: '<%= target_dir %>/libs.js'
                src: []
                options:
                    transform: ['browserify-shim']
                    require: '<%= js_dependencies %>'
                    browserifyOptions:
                        debug: yes

        coffeelint:
            dist: ['<%= src_dir %>/scripts/**/*.coffee']
            options:
                max_line_length:
                    level: 'ignore'
                indentation:
                    level: 'ignore'

        stylus:
            dist:
                files:
                    '<%= target_dir %>/app.css': '<%= src_dir %>/styles/app.styl'
                options:
                    define:
                        debug: no
                    paths: ['bower_components', 'node_modules', '<%= src_dir %>/styles']
                    'include css': yes

            debug:
                files:
                    '<%= target_dir %>/app.css': '<%= src_dir %>/styles/app.styl'
                options:
                    define:
                        debug: yes
                    paths: ['bower_components', 'node_modules', '<%= src_dir %>/styles']
                    compress: no
                    'include css': yes
                    sourcemap:
                        inline: yes

            libs:
                dest: '<%= target_dir %>/libs.css'
                src: ['src/styles/libs/index.styl']
                options:
                    paths: ['bower_components', 'node_modules', '<%= src_dir %>/styles']
                    compress: no
                    'include css': yes
                    sourcemap:
                        inline: yes

        jade:
            dist:
                files:
                    '<%= target_dir %>/index.html': '<%= src_dir %>/templates/app.jade'
                options:
                    data:
                        debug: no
                        version: '<%= pkg.version %>'
                        build: '<%= gitinfo.local.branch.current.shortSHA %>'

            debug:
                files:
                    '<%= target_dir %>/index.html': '<%= src_dir %>/templates/app.jade'
                options:
                    pretty: yes
                    data:
                        debug: yes
                        version: '<%= pkg.version %>'
                        build: '<%= gitinfo.local.branch.current.shortSHA %>'

        uglify:
            dist:
                files:
                    '<%= target_dir %>/app.js': ['<%= target_dir %>/app.js']
                options:
                    mangle: no

        cssmin:
            dist:
                files:
                    '<%= target_dir %>/app.css': ['<%= target_dir %>/app.css']
                options:
                    keepSpecialComments: 0

        htmlmin:
            dist:
                files:
                    '<%= target_dir %>/index.html': '<%= target_dir %>/index.html'
                options:
                    removeComments: yes
                    collapseWhitespace: yes

        copy:
            resrc:
                files: [
                    {
                        expand: yes
                        cwd: '<%= resrc_dir %>'
                        src: ['**']
                        dest: '<%= target_dir %>/'
                    }
                ]

            dist:
                files: [
                    {
                        expand: yes
                        cwd: '<%= resrc_dir %>'
                        src: ['**', '!<%= img_dir %>/**']
                        dest: '<%= target_dir %>/'
                    }
                ]


            fonts:
                files: [
                    {
                        expand: yes
                        cwd: 'bower_components/font-awesome-stylus'
                        src: ['fonts/**']
                        dest: '<%= target_dir %>/'
                    }
                ]

            cname:
                src: 'CNAME'
                dest: 'target/CNAME'

        imagemin:
            dist:
                files: [
                    {
                        expand: yes
                        cwd: '<%= resrc_dir %>'
                        src: ['<%= img_dir %>/**/*.{png,jpg,gif}']
                        dest: '<%= target_dir %>'
                    }
                ]

        clean:
            dist: ['<%= target_dir %>*']
            all: ['target']

        inline:
            dist:
                src: '<%= target_dir %>/index.html'
                dest: '<%= package_target %>'
                options:
                    tag: ''

        cssUrlEmbed:
            dist:
                src: '<%= target_dir %>/app.css'
                dest: '<%= target_dir %>/app.css'
                options:
                    failOnMissingUrl: no

        connect:
            dist:
                options:
                    base: '<%= target_dir %>'
                    keepalive: yes
                    livereload: no

            debug:
                options:
                    base: '<%= target_dir %>'
                    livereload: yes

        watch:
            jade:
                files: ['<%= src_dir %>/templates/**']
                tasks: ['gitinfo', 'jade:debug']

            stylus:
                files: ['<%= src_dir %>/styles/**/*.styl']
                tasks: ['stylus:debug']

            stylus_libs:
                files: ['<%= src_dir %>/styles/libs/**/*.styl']
                tasks: ['stylus:libs']

            coffee:
                files: ['<%= src_dir %>/scripts/**/*.coffee']
                tasks: ['gitinfo', 'browserify:debug']

            options:
                livereload: true

        'ftp-deploy':
            target:
                auth: '<%= ftp_auth %>'
                src: '<%= target_dir %>/public_html'
                dest: 'public_html'

    grunt.loadNpmTasks 'grunt-browserify'
    grunt.loadNpmTasks 'grunt-coffeelint'
    grunt.loadNpmTasks 'grunt-contrib-jade'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'
    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-css-url-embed'
    grunt.loadNpmTasks 'grunt-ftp-deploy'
    grunt.loadNpmTasks 'grunt-gitinfo'
    grunt.loadNpmTasks 'grunt-inline'

    grunt.registerTask 'debug:prepare', ['gitinfo', 'clean:all', 'browserify:libs', 'stylus:libs']
    grunt.registerTask 'debug:build', ['browserify:debug', 'jade:debug', 'stylus:debug']
    grunt.registerTask 'debug:stage', ['copy:resrc', 'copy:fonts']
    grunt.registerTask 'debug', ['debug:prepare', 'debug:build', 'debug:stage']
    grunt.registerTask 'livereload', ['debug', 'connect:debug', 'watch']

    grunt.registerTask 'dist:prepare', ['gitinfo',  'clean:all', 'coffeelint']
    grunt.registerTask 'dist:build', ['browserify:dist', 'stylus:dist', 'jade:dist']
    grunt.registerTask 'dist:stage', ['uglify', 'cssmin', 'htmlmin', 'imagemin', 'copy:dist', 'copy:fonts']
    grunt.registerTask 'dist', ['dist:prepare', 'dist:build', 'dist:stage']
    grunt.registerTask 'serve', ['dist', 'connect:dist']

    grunt.registerTask 'package:prepare', ['clean:all']
    grunt.registerTask 'package:build', ['dist']
    grunt.registerTask 'package:stage', ['cssUrlEmbed', 'inline', 'copy:cname', 'clean:dist']
    grunt.registerTask 'package', ['package:prepare', 'package:build', 'package:stage']

    grunt.registerTask 'deploy:ftp', ['ftp-deploy']

    grunt.registerTask 'default', ['dist']

    return
