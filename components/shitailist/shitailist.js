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
      'imatomo.service.groups'
    ])
    .controller('ShitailistController', ShitailistController);

  ShitailistController.$inject = ['$location', 'ImatomoValue', 'ShitaiesService', 'GroupsService'];

  /**
   * ShitailistController
   *
   * @class ShitailistController
   * @constructor
   */
  function ShitailistController($location, ImatomoValue, ShitaiesService, GroupsService) {
    console.log('ShitailistController Constructor');
    this.ShitaiesService = ShitaiesService;
    this.$location = $location;
    this.ImatomoValue = ImatomoValue;
    this.GroupsService = GroupsService;
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

    var isVibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (isVibrate) {
      alert('対応している!');
    }

    // 2秒間のバイブ → 1秒休止　→　再び2秒間
    navigator.vibrate([2000, 1000, 2000]);

    // グループ一覧取得
    var groupList = vm.GroupsService.findGroups();
    groupList.$loaded().then(function (x) {
      vm.groupList = groupList;

      // したい一覧
      var shitaies = vm.ShitaiesService.findShitaies();
      vm.items = shitaies;
    });

    // 期限のフィルタリング条件 (秒単位でみたらおかしいけど、、いまはもういいや)
    vm.filterDate = new Date().getTime();
  };

  ShitailistController.prototype.searchMyApprovals = function() {
    console.log('ShitailistController searchMyApprovals Method');
    console.log(vm.items);
    console.log(vm.items.length);
    var array = vm.items[0].approvals.length;
    console.log(array);

    for (var i = 0; i < vm.items.length; i++) {
      console.log(vm.items[i].approvals);
      for (var j = 0; j < vm.items[i].approvals.length; j++) {
        if (vm.items[i].approvals[j].userid === vm.ImatomoValue.profile.id) {
          console.log('b');
          console.log(i);
          console.log(j);
          console.log(vm.items[i].$id);
          console.log(vm.items[i].approvals[j].userid);
          return true;
        }
        return false;
      }
    }
  };

  /**
   * 賛同する
   */
  ShitailistController.prototype.approval = function(id) {
    console.log('ShitailistController approval Method');
    vm.ShitaiesService.approval(id);
  };

  /**
   * キャンセルする
   */
  ShitailistController.prototype.cancel = function(id) {
    console.log('ShitailistController approval Method');
    vm.ShitaiesService.cancel(id);
  };

  /**
   * 賛同ボタンを表示できるか検証する
   */
  ShitailistController.prototype.isApproval = function(shitai) {

    if (shitai.userid === vm.ImatomoValue.profile.id) {
      return false;
    }

    // 賛同がまだ０なら表示
    if (!shitai.approvals) {
      return true;
    }

    var isshow = true;
    shitai.approvals.forEach(function(s) {
      if (s.userid === vm.ImatomoValue.profile.id) {
        isshow = false;
      }
    });
    return isshow;
  };

  /**
   * キャンセルボタンを表示できるか検証する
   */
  ShitailistController.prototype.isCancel = function(shitai) {

    // 自分が公言したものなら非表示
    if (shitai.userid === vm.ImatomoValue.profile.id) {
      return false;
    }

    // 賛同がまだ０なら表示
    if (!shitai.approvals) {
      return false;
    }

    var isshow = false;
    shitai.approvals.forEach(function(s) {
      if (s.userid === vm.ImatomoValue.profile.id) {
        isshow = true;
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

  ShitailistController.prototype.searchMember = function(data) {
    console.log('ShitailistController searchMember Method');

    //「グループ：みんな」の公言は表示
    if (data.group === '') {
      return true;
    }

    // グループ一覧が存在しない場合は表示
    if (vm.groupList !== undefined) {
      return true;
    }

    // 「グループ：自身が所属しているグループ」の公言は表示
    for (var i = 0; i < vm.groupList.length; i++) {
      if (vm.groupList[i].$id === data.group) {
        for (var j = 0; j < vm.groupList[i].members.length; j++) {
          if (vm.groupList[i].members[j].userid === vm.ImatomoValue.profile.id) {
            return true;
          }
        }
      }
    }

    // 「グループ：自身が所属していないグループ」の公言は非表示
    return false;
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
