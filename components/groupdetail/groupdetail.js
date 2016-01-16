/**
 * Groupdetail Components module.
 *
 * @module imatomo.components.groupdetail
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.groupdetail', [])
    .controller('GroupdetailController', GroupdetailController);

  GroupdetailController.$inject = [];

  /**
   * GroupdetailController
   *
   * @class GroupdetailController
   * @constructor
   */
  function GroupdetailController() {
    console.log('GroupdetailController Constructor');
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  GroupdetailController.prototype.activate = function() {
    console.log('GroupdetailController activate Method');
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
