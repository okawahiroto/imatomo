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

  ShitailistController.$inject = ['$firebaseArray'];

  /**
   * ShitailistController
   *
   * @class ShitailistController
   * @constructor
   */
  function ShitailistController($firebaseArray) {
    console.log('ShitailistController Constructor');
    this.$firebaseArray = $firebaseArray;
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
    var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/shitailist');
    // したい一覧を画面に設定
    var shitailist = vm.$firebaseArray(ref);
    vm.items = shitailist;
  };

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitailistController.prototype.approval = function() {
    console.log('ShitailistController approval Method');
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
