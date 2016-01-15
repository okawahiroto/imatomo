/**
 * Shitailist Components module.
 *
 * @module imatomo.components.shitailist
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitailist', [
      'imatomo.service.shitaies'
    ])
    .controller('ShitailistController', ShitailistController);

  ShitailistController.$inject = ['$location', 'ShitaiesService', 'ProfilesService'];

  /**
   * ShitailistController
   *
   * @class ShitailistController
   * @constructor
   */
  function ShitailistController($location, ShitaiesService, ProfilesService) {
    console.log('ShitailistController Constructor');
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
    this.$location = $location;
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

    // したい一覧を画面に設定
    var shitaies = vm.ShitaiesService.findShitaies();
    vm.items = shitaies;
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
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitailistController.prototype.moveDetail = function(id) {
    console.log('ShitailistController moveDetail Method');
    vm.$location.path('/shitaidetail/' + id);
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
