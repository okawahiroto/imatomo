/**
 * Profile Components module.
 *
 * @module imatomo.components.profile
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.profile', [
      'imatomo.service.profiles'
    ])
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$location', 'ProfilesService'];

  /**
   * ProfileController
   *
   * @class ProfileController
   * @constructor
   */
  function ProfileController($location, ProfilesService) {
    console.log('ProfileController Constructor');
    this.$location = $location;
    this.ProfilesService = ProfilesService;
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ProfileController.prototype.activate = function() {
    console.log('ProfileController activate Method');
    vm = this;

    // ユーザ情報を取得
    var profile = vm.ProfilesService.getStorageProfile();

    // なければ新規フラグを立てて終了
    if (!profile) {
      vm.mode = 'new';
      return;
    }

    vm.username = profile.username;
  };

  /**
   * @method register
   */
  ProfileController.prototype.register = function() {
    console.log('ProfileController register Method');
    var user = {
      username: vm.username
    };

    // 登録後に実行する処理 $promiss.then で画面遷移させる必要あり
    var aftfnc = function() {
      vm.$location.path('shitailist');
    };

    // サービス実行
    if (vm.mode === 'new') {
      vm.ProfilesService.addProfile(user, aftfnc);
    } else {
      vm.ProfilesService.modProfile(user, aftfnc);
    }

  };

  /**
   * @method closeAlert
   */
  ProfileController.prototype.closeAlert = function () {
    console.log('close');
    vm.status = '';
    vm.message = '';
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
