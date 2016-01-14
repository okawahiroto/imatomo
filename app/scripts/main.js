/**
 * This is imatomo module.
 *
 * @module imatomo
 */
(function () {
  'use strict';

  angular
    .module('imatomo', [
      'ngNewRouter',
      'imatomo.config',
      'imatomo.components.home',
      'imatomo.components.about',
      'imatomo.components.contact'
    ])
    .controller('AppController', AppController);

  AppController.$routeConfig = [
    {path: '/',       redirectTo: '/home'},
    {path: '/home',    component: 'home'},
    {path: '/about',   component: 'about'},
    {path: '/contact', component: 'contact'}
  ];

  AppController.$inject = [];

  /**
   * AppController
   *
   * @class AppController
   * @main imatomo
   * @constructor
   */
  function AppController () {}
})();
