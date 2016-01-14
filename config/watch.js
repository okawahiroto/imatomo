(function() {
  'use strict';

  module.exports = {
    bower: {
      files: ['bower.json'],
      tasks: ['wiredep']
    },
    js: {
      files: ['<%= paths.app %>/{,directives,service,components}/{,*/}*.js'],
      tasks: ['jshint', 'jscs'],
      options: {
        livereload: true
      }
    },
    html: {
      files: ['<%= paths.app %>/{,directives,service,components}/{,*/}*.html'],
      options: {
        livereload: true
      }
    },
    jstest: {
      files: ['karma/**/*.js'],
      tasks: ['test:watch']
    },
    gruntfile: {
      files: ['Gruntfile.js']
    },
    styles: {
      files: ['<%= paths.app %>/styles/{,*/}*.css'],
      tasks: ['newer:copy:styles', 'autoprefixer']
    }
  };
})();
