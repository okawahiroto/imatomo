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
      'imatomo.service.profiles',
      'imatomo.service.groups'
    ])
    .controller('ShitailistController', ShitailistController);

  ShitailistController.$inject = ['$location', 'ShitaiesService', 'ProfilesService', 'GroupsService'];

  /**
   * ShitailistController
   *
   * @class ShitailistController
   * @constructor
   */
  function ShitailistController($location, ShitaiesService, ProfilesService, GroupsService) {
    console.log('ShitailistController Constructor');
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
    this.$location = $location;
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

    // したい一覧
    var shitaies = vm.ShitaiesService.findShitaies();
    vm.items = shitaies;

    // プロファイル保持
    vm.profile = vm.ProfilesService.getStorageProfile();

    // 期限のフィルタリング条件 (秒単位でみたらおかしいけど、、いまはもういいや)
    vm.filterDate = new Date().getTime();
  };

  //ローカルストレージに格納されているuseridを取得
  // var a = window.localStorage.getItem("profile");
  // var b = JSON.parse(a);
  // console.log(b["userid"]);
  // var userid = b["userid"];

  //useridによるfilter
  ShitailistController.prototype.setFilter = function(userid) {
      console.log('ShitailistController setFilter Method');
      if (userid) {
        vm.useridFilter = {userid : userid};
        console.log(userid);
      } else {
        vm.useridFilter = undefined;
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
  ShitailistController.prototype.isCancel = function(shitai) {
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

    // 「グループ：自身が所属しているグループ」の公言は表示
    var groupList = vm.GroupsService.findGroups();
    for (var i = 0; i < groupList.length; i++) {
      if (groupList[i].$id === data.group) {
        for (var j = 0; j < groupList[i].members.length; j++) {
          if (groupList[i].members[j].userid === vm.profile.userid) {
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
