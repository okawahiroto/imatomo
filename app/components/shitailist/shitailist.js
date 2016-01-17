/**
 * Shitailist Components module.
 *
 * @module imatomo.components.shitailist
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitailist', [
      'imatomo.service.shitaies',
      'imatomo.service.profiles'
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

    // したい一覧
    var shitaies = vm.ShitaiesService.findShitaies();
    vm.items = shitaies;

    // プロファイル一覧
    var profiles = vm.ProfilesService.getProfiles();

    // 名前解決
    shitaies.$loaded().then(function (x) {
      profiles.$loaded().then(function (x) {
        for (var i = 0; i < shitaies.length; i++) {
          var profile = profiles.$getRecord(shitaies[i].userid);
          if (profile) {
            shitaies[i].username = profile.username;
          }
        }
      });
    });

    // プロファイル保持
    vm.profile = vm.ProfilesService.getStorageProfile();
  };

  /**
   * 賛同する
   */
  ShitailistController.prototype.approval = function(id) {
    console.log('ShitailistController approval Method');
    vm.ShitaiesService.approval(id);
  };

  /**
   * 賛同ボタンを表示できるか検証する
   */
  ShitailistController.prototype.isApproval = function(shitai) {
    // ユーザ登録がまだなら非表示
    if (!vm.profile) {
      return false;
    }

    // 自分が公言したものなら非表示
    if (shitai.userid === vm.profile.userid) {
      return false;
    }

    // 賛同がまだ０なら表示
    if (!shitai.approvals) {
      return true;
    }

    var isshow = true;
    shitai.approvals.forEach(function(s) {
      if (s.userid === vm.profile.userid) {
        isshow = false;
      }
    });
    return isshow;
  };

  /**
   * 詳細画面へ
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
