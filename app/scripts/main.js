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
      'firebase',
      'imatomo.components.shitailist',
      'imatomo.components.shitai',
      'imatomo.components.group',
      'imatomo.components.profile',
      'imatomo.components.shitaidetail',
      'imatomo.components.groupdetail'
    ])
    .controller('AppController', AppController);

  AppController.$routeConfig = [
    {path: '/',       redirectTo: '/shitailist'},
    {path: '/shitailist',    component: 'shitailist'},
    {path: '/shitai',    component: 'shitai'},
    {path: '/group',    component: 'group'},
    {path: '/profile',    component: 'profile'},
    {path: '/shitaidetail/:id',    component: 'shitaidetail'},
    {path: '/groupdetail',    component: 'groupdetail'}
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
