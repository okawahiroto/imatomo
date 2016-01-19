(function() {
  'use strict';

  module.exports = {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= paths.app %>',
        dest: '<%= paths.dist %>',
        src: [
          '*.{ico,png,txt}',
          'images/{,*/}*.webp',
          'components/{,*/}*.html',
          'components/{,*/}*.js',
          'service/{,*/}*.js',
          'directives/{,*/}*.html',
          'audio/{,*/}*.mp3',
          '{,*/}*.html',
          'styles/fonts/{,*/}*.*'
        ]
      }, {
        expand: true,
        dot: true,
        cwd: 'bower_components/bootstrap/dist',
        src: 'fonts/*',
        dest: '<%= paths.dist %>'
      }]
    },
    styles: {
      expand: true,
      dot: true,
      cwd: '<%= paths.app %>/styles',
      dest: '.tmp/styles/',
      src: '{,*/}*.css'
    }
  };
})();
