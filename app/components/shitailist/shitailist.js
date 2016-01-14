/**
 * Shitailist Components module.
 *
 * @module imatomo.components.shitailist
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitailist', [])
    .controller('ShitailistController', ShitailistController);

  ShitailistController.$inject = [];

  /**
   * ShitailistController
   *
   * @class ShitailistController
   * @constructor
   */
  function ShitailistController() {
    console.log('ShitailistController Constructor');
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitailistController.prototype.activate = function() {
    console.log('ShitailistController activate Method');
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
