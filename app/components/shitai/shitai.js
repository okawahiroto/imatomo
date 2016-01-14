/**
 * Shitai Components module.
 *
 * @module imatomo.components.shitai
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitai', [])
    .controller('ShitaiController', ShitaiController);

  ShitaiController.$inject = [];

  /**
   * ShitaiController
   *
   * @class ShitaiController
   * @constructor
   */
  function ShitaiController() {
    console.log('ShitaiController Constructor');
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitaiController.prototype.activate = function() {
    console.log('ShitaiController activate Method');
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
