// Karma configuration
// Generated on Mon Apr 20 2015 20:03:02 GMT+0900 (JST)
'use strict';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //frameworks: ['mocha','chai','sinon'],
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-new-router/dist/router.es5.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angularjs-toaster/toaster.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-i18n/angular-locale_ja-jp.js',
      'bower_components/angular-directive.g-signin/google-plus-signin.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      // injector:js
      'app/components/group/group.js',
      'app/components/groupdetail/groupdetail.js',
      'app/components/profile/profile.js',
      'app/components/shitai/shitai.js',
      'app/components/shitaidetail/shitaidetail.js',
      'app/components/shitailist/shitailist.js',
      'app/directives/userid/userid.js',
      'app/directives/userpicture/userpicture.js',
      'app/scripts/config.js',
      'app/scripts/confirm.js',
      'app/scripts/value.js',
      'app/service/groups/groups.js',
      'app/service/gruntfiles/gruntfiles.js',
      'app/service/profiles/profiles.js',
      'app/service/shitaies/shitaies.js',
      'test/components/group/group.spec.js',
      'test/components/groupdetail/groupdetail.spec.js',
      'test/components/profile/profile.spec.js',
      'test/components/shitai/shitai.spec.js',
      'test/components/shitaidetail/shitaidetail.spec.js',
      'test/components/shitailist/shitailist.spec.js',
      'test/directives/userpicture/userpicture.spec.js',
      'test/main.spec.js',
      'test/service/groups/groups.mock.js',
      'test/service/groups/groups.spec.js',
      'test/service/gruntfiles/gruntfiles.mock.js',
      'test/service/gruntfiles/gruntfiles.spec.js',
      'test/service/profiles/profiles.mock.js',
      'test/service/profiles/profiles.spec.js',
      'test/service/shitaies/shitaies.mock.js',
      'test/service/shitaies/shitaies.spec.js',
      // endinjector
      'app/scripts/main.js',
      'test/main.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'report',
      subdir: 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
