/**
 * Shitai Components module.
 *
 * @module imatomo.components.shitai
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitai', [
      'imatomo.service.shitaies',
      'imatomo.service.profiles'
    ])
    .controller('ShitaiController', ShitaiController);

  ShitaiController.$inject = ['$location', 'ShitaiesService', 'ProfilesService'];

  /**
   * ShitaiController
   *
   * @class ShitaiController
   * @constructor
   */
  function ShitaiController($location, ShitaiesService, ProfilesService) {
    console.log('ShitaiController Constructor');
    this.$location = $location;
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
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
   * @method register
   */
  ShitaiController.prototype.register = function() {
    console.log('ShitaiController register Method');

    var profile = vm.ProfilesService.getStorageProfile();

    // なければ終了
    if (!profile) {
      vm.status = 'dengire';
      vm.message = 'ユーザ登録を行ってください。';
      return;
    }

    var shitai = {
      userid : profile.userid,
      //username : profile.username,
      title: vm.title,
      time: vm.time,
      comment : (vm.comment === undefined ? '' : vm.comment),
      place: (vm.place === undefined ? '' : vm.place),
      createtimestamp : Firebase.ServerValue.TIMESTAMP
    };

    // Firebaseに追加
    vm.ShitaiesService.addShitai(shitai);

    // shitailistへ遷移
    vm.$location.path('shitailist');
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;

  /**
   * @method closeAlert
   */
  ShitaiController.prototype.closeAlert = function () {
    console.log('close');
    vm.status = '';
    vm.message = '';
  };

})();
