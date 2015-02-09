module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    copy:
      dist:
        files: [
          {
            expand: yes
            cwd: 'src'
            src: ['**/*.html', '**/*.css', '**/*.js']
            dest: 'target'
          }
        ]
    
    connect: 
      server:
        options:
          base: 'target'
          keepalive: yes
          open:
            target: 'http://localhost:8000'
            appName: 'chrome'
    
    ftp_push:
      dist:
        options:
          host: process.env.FTP_HOST
          dest: 'public_html'
          username: process.env.FTP_USERNAME
          password: process.env.FTP_PASSWORD
        files: [{
          expand: yes
          cwd: 'target'
          src: [
            '**/*.html'
            '**/*.css'
            '**/*.js'
          ]
        }]
          
  grunt.loadNpmTasks 'grunt-ftp-push'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  
  grunt.registerTask 'default', ['copy']
  