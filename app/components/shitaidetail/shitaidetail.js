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

  ShitaidetailController.$inject = ['$location', '$routeParams', 'ImatomoValue', 'ShitaiesService', 'ProfilesService', 'GroupsService', '$uibModal'];

  /**
   * ShitaidetailController
   *
   * @class ShitaidetailController
   * @constructor
   */
  function ShitaidetailController($location, $routeParams, ImatomoValue, ShitaiesService, ProfilesService, GroupsService, $uibModal) {
    console.log('ShitaidetailController Constructor');
    this.$location = $location;
    this.id = $routeParams.id;
    this.ImatomoValue = ImatomoValue;
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
    this.GroupsService = GroupsService;
    this.$uibModal = $uibModal;
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

    vm.shitai = shitaiItem;
    vm.comment = vm.shitai.comment;
    // 名称解決
    vm.ProfilesService.getProfile(shitaiItem.userid, function(profile) {
      if (profile) {
        vm.username = profile.username;
        vm.userpicture = profile.picture;
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

  };

  /**
   * 保存する
   */
  ShitaidetailController.prototype.shitaiSave = function() {
    console.log('ShitaidetailController shitaiSave Method');

    // 画面値をモデルに反映
    vm.shitai.comment = vm.comment;

    // 備考更新
    vm.ShitaiesService.findShitaies().$save(vm.shitai);

    // 一覧画面へ
    vm.$location.path('/shitailist');
  };

  /**
   * 削除ボタン
   */
  ShitaidetailController.prototype.shitaiDelete = function() {
    console.log('ShitaidetailController shitaiDelete Method');

    // 確認ダイアログ
    var modalInstance = vm.$uibModal.open({
      templateUrl: 'confirm-modal.html',
      controller: 'ImatomoConfirm',
      resolve: {
        message: function() {
          return '削除します。よろしいですか？';
        }
      }
    });

    modalInstance.result.then(
      function() {
        // キャンセルの場合は何もしない
      }, function() {

        vm.ShitaiesService.findShitaies().$remove(vm.shitai);
        vm.$location.path('/shitailist');
      });
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
  ShitaidetailController.prototype.isApproval = function() {

    // 自分が公言したものなら非表示
    if (vm.shitai.userid === vm.ImatomoValue.profile.id) {
      return false;
    }

    // 賛同がまだ０なら表示
    if (!vm.shitai.approvals) {
      return true;
    }

    var isshow = true;
    vm.shitai.approvals.forEach(function(s) {
      if (s.userid === vm.ImatomoValue.profile.id) {
        isshow = false;
      }
    });
    return isshow;
  };

  /**
   * キャンセルボタンを表示できるか検証する
   */
  ShitaidetailController.prototype.isCancel = function() {

    // 自分が公言したものなら非表示
    if (vm.shitai.userid === vm.ImatomoValue.profile.id) {
      return false;
    }

    // 賛同がまだ０なら表示
    if (!vm.shitai.approvals) {
      return false;
    }

    var isshow = false;
    vm.shitai.approvals.forEach(function(s) {
      if (s.userid === vm.ImatomoValue.profile.id) {
        isshow = true;
      }
    });
    return isshow;
  };

  /**
   * 今日からの日付差からフォーマット変更
   */
  ShitaidetailController.prototype.dateFormat = function(time) {

    // まずは今日深夜０時を取得
    var todaysEnd = new Date();
    todaysEnd.setHours(23, 59, 59, 999);

    // 今日判定
    if (time < todaysEnd.getTime()) {
      return '今日 HH:mm';
    }

    // 明日判定
    todaysEnd.setTime(todaysEnd.getTime() + 86400000);
    if (time < todaysEnd.getTime()) {
      return '明日(EEE) HH:mm';
    }

    // 明後日判定
    todaysEnd.setTime(todaysEnd.getTime() + 86400000);
    if (time < todaysEnd.getTime()) {
      return '明後日(EEE) HH:mm';
    }

    return 'M/dd (EEE) HH:mm';
  };

})();
