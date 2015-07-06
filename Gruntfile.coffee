config = require './config'

module.exports = (grunt) ->
    require('time-grunt')(grunt)

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        src_dir: 'src'
        target_dir: 'target/public_html'
        resrc_dir: 'resources'
        img_dir: 'img'
        gitinfo: {}

        browserify:
            dist:
                files:
                    '<%= target_dir %>/app.js': ['<%= src_dir %>/scripts/app.coffee']
                options:
                    transform: ['coffeeify', 'browserify-shim', 'debowerify', ['browserify-plain-jade',
                        build: '<%= gitinfo.local.branch.current.shortSHA %>'
                        version: '<%= pkg.version %>'
                        __debug: no
                    ]]
                    browserifyOptions:
                        extensions: ['.coffee']

            debug:
                files:
                    '<%= target_dir %>/app.js': ['<%= src_dir %>/scripts/app.coffee']
                options:
                    transform: ['coffeeify', 'browserify-shim', ['browserify-plain-jade',
                        build: '<%= gitinfo.local.branch.current.shortSHA %>'
                        version: '<%= pkg.version %>'
                        __debug: no
                    ]]
                    external: config.js_dependencies
                    browserifyOptions:
                        extensions: ['.coffee']
                        debug: yes

            libs:
                dest: '<%= target_dir %>/libs.js'
                src: []
                options:
                    transform: ['browserify-shim']
                    require: config.js_dependencies
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
            target: ['<%= target_dir %>/*']

        inline:
            target:
                src: 'target/public_html/index.html'
                dest: 'index.html'
                options:
                    tag: ''

        cssUrlEmbed:
            target:
                src: 'target/public_html/app.css'
                dest: 'target/public_html/app.css'
                options:
                    failOnMissingUrl: no

        connect:
            serve:
                options:
                    base: '<%= target_dir %>'
                    keepalive: yes
                    livereload: no

            debug:
                options:
                    base: '<%= target_dir %>'
                    livereload: yes

        watch:
            app:
                files: ['<%= src_dir %>/templates/app.jade']
                tasks: ['gitinfo', 'jade:debug']

            jade:
                files: ['<%= src_dir %>/templates/**/*.jade', '!<%= src_dir %>/templates/app.jade']
                tasks: ['gitinfo', 'browserify:debug']

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
                auth: config.ftp_auth

                src: '<%= src_dir %>/public_html'
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
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-css-url-embed'
    grunt.loadNpmTasks 'grunt-ftp-deploy'
    grunt.loadNpmTasks 'grunt-gitinfo'
    grunt.loadNpmTasks 'grunt-inline'

    grunt.registerTask 'debug:prepare', ['gitinfo', 'clean', 'copy:resrc', 'copy:fonts', 'browserify:libs', 'stylus:libs']
    grunt.registerTask 'debug:build', ['browserify:debug', 'jade:debug', 'stylus:debug']
    grunt.registerTask 'livereload', ['debug:prepare', 'debug:build', 'connect:debug', 'watch']

    grunt.registerTask 'build', ['gitinfo', 'coffeelint', 'clean', 'browserify:dist', 'stylus:dist', 'jade:dist']
    grunt.registerTask 'minify', ['uglify', 'cssmin', 'imagemin']
    grunt.registerTask 'default', ['build', 'minify', 'copy']
    grunt.registerTask 'package', ['default', 'cssUrlEmbed', 'inline', 'clean']

    return
