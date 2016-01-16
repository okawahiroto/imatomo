(function() {
  'use strict';

  module.exports = {
    options: {
      // Task-specific options go here.
    },
    scripts: {
      options: {
        template: '<%= paths.app %>/index.html',
        transform: function(filePath) {
          filePath = filePath.replace('/app/', '');
          filePath = filePath.replace('/.tmp/', '');
          return '<script src="' + filePath + '"></script>';
        },
        starttag: '<!-- injector:js -->',
        endtag: '<!-- endinjector -->'
      },
      files: {
        '<%= paths.app %>/index.html': [
            ['<%= paths.app %>/**/*.js',
             '!<%= paths.app %>/scripts/main.js']
          ]
      }
    },
    css: {
      options: {
        template: '<%= paths.app %>/index.html',
        transform: function(filePath) {
          filePath = filePath.replace('/app/', '');
          filePath = filePath.replace('/.tmp/', '');
          return '<link rel="stylesheet" href="' + filePath + '" />';
        },
        starttag: '<!-- injector:css -->',
        endtag: '<!-- endinjector -->'
      },
      files: {
        '<%= paths.app %>/index.html': [
            ['<%= paths.app %>/**/*.css',
             '!<%= paths.app %>/styles/main.css']
          ]
      }
    },
    test: {
      options: {
        template: '<%= paths.karma.config %>',
        transform: function(filePath) {
          filePath = filePath.replace('/app/', 'app/');
          filePath = filePath.replace('/.tmp/', '.tmp/');
          filePath = filePath.replace('/test/', 'test/');
          return '\'' + filePath + '\',';
        },
        starttag: '// injector:js',
        endtag: '// endinjector'
      },
      files: {
        '<%= paths.karma.config %>': [
            ['<%= paths.app %>/**/*.js',
             '!<%= paths.app %>/scripts/main.js'],
            ['test/**/*.js',
             '!test/karma.conf.js']
          ]
      }
    },
    base4ghpages: {
      options: {
        template: '<%= paths.app %>/index.html',
        starttag: '<!-- injector:base-start -->',
        endtag: '<!-- injector:base-end -->',
        transform: function(filePath) {
          return '<base href="http://okawahiroto.github.io/imatomo/">';
        }
      },
      files: {
        '<%= paths.app %>/index.html': [
            ['<%= paths.app %>/index.html']
          ]
      }
    },
    base4local: {
      options: {
        template: '<%= paths.app %>/index.html',
        starttag: '<!-- injector:base-start -->',
        endtag: '<!-- injector:base-end -->',
        transform: function(filePath) {
          return '<base href="/">';
        }
      },
      files: {
        '<%= paths.app %>/index.html': [
            ['<%= paths.app %>/index.html']
          ]
      }
    }
  };
})();
