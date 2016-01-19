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
      'imatomo.service.profiles',
    ])
    .controller('ShitaidetailController', ShitaidetailController);

  ShitaidetailController.$inject = ['$location', '$routeParams', 'ShitaiesService', 'ProfilesService'];

  /**
   * ShitaidetailController
   *
   * @class ShitaidetailController
   * @constructor
   */
  function ShitaidetailController($location, $routeParams, ShitaiesService, ProfilesService) {
    console.log('ShitaidetailController Constructor');
    this.$location = $location;
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
    vm.ShitaiesService.getShitai(vm.id, setShitaiItem);
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
    vm.title       = shitaiItem.title;
    vm.time        = shitaiItem.time;
    vm.place       = shitaiItem.place;
    vm.comment     = shitaiItem.comment;
    vm.createtimesstamp = shitaiItem.createtimesstamp;

    // プロファイル一覧
    var profiles = vm.ProfilesService.getProfiles();

    // 名前解決
    profiles.$loaded().then(function (x) {
      var profile = profiles.$getRecord(shitaiItem.userid);
      if (profile) {
        vm.username = profile.username;
      }
    });

    // 賛同者取得
    var approvalsMembers = ['だれもいません'];
    profiles.$loaded().then(function (x) {
      if (shitaiItem.approvals) {
        approvalsMembers.shift();
        for (var i = 0; i < shitaiItem.approvals.length; i++) {
          var profile = profiles.$getRecord(shitaiItem.approvals[i].userid);
          if (profile) {
            approvalsMembers.push(profile.username);
          }
        }
      }
    });
    vm.approvals = approvalsMembers;
  };

  /**
   * 削除ボタン
   */
  ShitaidetailController.prototype.shitaiDelete = function() {
    console.log('ShitaidetailController shitaiDelete Method');

    // したい一覧
    var shitaiesArray = vm.ShitaiesService.findShitaies();

    for (var i = 0; i < shitaiesArray.length; i++) {
      if (vm.id === shitaiesArray[i].$id) {
        console.log(shitaiesArray[i]);
        shitaiesArray.$remove(i);
      }
    }

    // 一覧画面へ
    vm.$location.path('/shitailist/');
  };

})();
