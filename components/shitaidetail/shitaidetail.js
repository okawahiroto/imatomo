/**
 * Shitaidetail Components module.
 *
 * @module imatomo.components.shitaidetail
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitaidetail', [
      'imatomo.service.shitaies',
      'imatomo.service.profiles'
    ])
    .controller('ShitaidetailController', ShitaidetailController);

  ShitaidetailController.$inject = ['$routeParams', 'ShitaiesService', 'ProfilesService'];

  /**
   * ShitaidetailController
   *
   * @class ShitaidetailController
   * @constructor
   */
  function ShitaidetailController($routeParams, ShitaiesService, ProfilesService) {
    console.log('ShitaidetailController Constructor');
    this.id = $routeParams.id;
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
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
    vm.ShitaiesService.findShitai(vm.id, setShitaiItem);
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;

  /**
   * @method setShitaiItem
   * @private
   */
  var setShitaiItem = function (shitaiItem) {
    vm.id          = shitaiItem.$id;
    vm.userid      = shitaiItem.userid;
    vm.username    = shitaiItem.username;
    vm.title       = shitaiItem.title;
    vm.time        = shitaiItem.time;
    vm.place       = shitaiItem.place;
    vm.comment     = shitaiItem.comment;
    vm.createtimesstamp = shitaiItem.createtimesstamp;
  };

})();
