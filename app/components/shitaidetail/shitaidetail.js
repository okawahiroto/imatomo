/**
 * Shitaidetail Components module.
 *
 * @module imatomo.components.shitaidetail
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitaidetail', [])
    .controller('ShitaidetailController', ShitaidetailController);

  ShitaidetailController.$inject = [];

  /**
   * ShitaidetailController
   *
   * @class ShitaidetailController
   * @constructor
   */
  function ShitaidetailController() {
    console.log('ShitaidetailController Constructor');
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitaidetailController.prototype.activate = function() {
    console.log('ShitaidetailController activate Method');
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
