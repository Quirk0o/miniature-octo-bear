
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        script: 'server.js'
      },
      dev: {
        options: {
          node_env: 'dev'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      config: {
        files: [ 'package.json' ],
        tasks: [ 'dist', 'express' ],
        options: {
          spawn: false
        }
      },
      js: {
        files: [ 'Gruntfile.js', 'server.js' ],
        tasks: [ 'jshint:server', 'express' ],
        options: {
          spawn: false
        }
      },
      angular: {
        files: [ 'app/modules/**/*.js' ],
        tasks: [ 'jshint:client', 'uglify' ]
      },
      sass: {
        files: [ 'app/scss/**/*.scss' ],
        tasks: [ 'sass' ]
      },
      css: {
        files: [ 'pubic/assets/css/*.css', 'public/assets/css/*.css.map' ]
      },
      jade: {
        files: [ 'app/views/*.jade', 'app/modules/**/*.jade' ]
      },
      bower: {
        files: [ 'bower.json' ],
        tasks: [ 'wiredep' ]
      }
    },
    wiredep: {
      options: {
        ignorePath: '../../public/'
      },
      dev: {
        src: [ 'app/views/_scripts.jade', 'app/views/_stylesheets.jade' ],
        exclude: [ 'public/lib/foundation/css']
      }
    },
    jshint: {
      server: [ 'Gruntfile.js', 'server.js' ],
      client: [ 'app/modules/**/*.js' ]
    },
    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          'public/assets/js/main.js': 'app/modules/**/*.js'
        }
      }
    },
    sass: {
      options: {
        noCache: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scss',
          src: [ '*.scss' ],
          dest: 'public/assets/css/',
          ext: '.css'
        }]
      }
    }
  });

  grunt.registerTask('dist', [ 'wiredep', 'sass', 'uglify' ]);

  grunt.registerTask('test', [ 'jshint' ]);

  grunt.registerTask('serve', [ 'express', 'watch' ]);

  grunt.registerTask('dev', [ 'test', 'dist', 'serve' ]);

  grunt.registerTask('default', [ 'dev' ]);

};