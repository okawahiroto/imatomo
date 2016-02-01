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
      'imatomo.service.groups'
    ])
    .controller('ShitaidetailController', ShitaidetailController);

  ShitaidetailController.$inject = ['$location', '$routeParams', 'ShitaiesService', 'ProfilesService', 'GroupsService'];

  /**
   * ShitaidetailController
   *
   * @class ShitaidetailController
   * @constructor
   */
  function ShitaidetailController($location, $routeParams, ShitaiesService, ProfilesService, GroupsService) {
    console.log('ShitaidetailController Constructor');
    this.$location = $location;
    this.id = $routeParams.id;
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
    this.profile = ProfilesService.getStorageProfile();
    this.GroupsService = GroupsService;
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

    // グループ名取得
    var groupname = 'みんな';
    var groupList = vm.GroupsService.findGroups();
    groupList.$loaded().then(function (x) {
      for (var i = 0; i < groupList.length; i++) {
        if (groupList[i].$id === shitaiItem.group) {
          groupname = groupList[i].groupname;
          break;
        }
      }
      vm.group = groupname;
    });

    // 賛同者取得
    vm.approvals = shitaiItem.approvals;
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

  /**
   * 賛同する
   */
  ShitaidetailController.prototype.approval = function(id) {
    console.log('ShitaidetailController approval Method');
    vm.ShitaiesService.approval(id);
    vm.ShitaiesService.getShitai(vm.id, setShitaiItem);
  };

  /**
   * キャンセルする
   */
  ShitaidetailController.prototype.cancel = function(id) {
    console.log('ShitaidetailController cancel Method');
    vm.ShitaiesService.cancel(id);
    vm.ShitaiesService.getShitai(vm.id, setShitaiItem);
  };

  /**
   * 賛同ボタンを表示できるか検証する
   */
  ShitaidetailController.prototype.isApproval = function(shitai) {
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
   * キャンセルボタンを表示できるか検証する
   */
  ShitaidetailController.prototype.isCancel = function(shitai) {
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
      return false;
    }

    var isshow = false;
    shitai.approvals.forEach(function(s) {
      if (s.userid === vm.profile.userid) {
        isshow = true;
      }
    });
    return isshow;
  };

})();
