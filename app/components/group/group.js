/**
 * Group Components module.
 *
 * @module imatomo.components.group
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.group', [])
    .controller('GroupController', GroupController);

  GroupController.$inject = [];

  /**
   * GroupController
   *
   * @class GroupController
   * @constructor
   */
  function GroupController() {
    console.log('GroupController Constructor');
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  GroupController.prototype.activate = function() {
    console.log('GroupController activate Method');
    vm = this;
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
