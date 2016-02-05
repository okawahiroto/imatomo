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

  ShitailistController.$inject = ['$location', 'ImatomoValue', 'ShitaiesService', 'GroupsService', '$uibModal'];

  /**
   * ShitailistController
   *
   * @class ShitailistController
   * @constructor
   */
  function ShitailistController($location, ImatomoValue, ShitaiesService, GroupsService, $uibModal) {
    console.log('ShitailistController Constructor');
    this.ShitaiesService = ShitaiesService;
    this.$location = $location;
    this.ImatomoValue = ImatomoValue;
    this.GroupsService = GroupsService;
    this.$uibModal = $uibModal;
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

    // グループ一覧取得
    var groupList = vm.GroupsService.findGroups();
    groupList.$loaded().then(function (x) {
      vm.groupList = groupList;

      // したい一覧
      var shitaies = vm.ShitaiesService.findShitaies();
      vm.items = shitaies;

      // フラグ初期化
      vm.flag = 0;
    });

    // 期限のフィルタリング条件 (秒単位でみたらおかしいけど、、いまはもういいや)
    vm.filterDate = new Date().getTime();
  };

  // ShitailistController.prototype.searchMyApprovals = function(data) {
  //   console.log('ShitailistController searchMyApprovals Method');
  //
  //   // 賛同者がいなかったら非表示
  //   if (!data.approvals) {
  //     return false;
  //   } else {
  //     // 自分が賛同していたら(賛同者の中に自分が含まれていたら)表示
  //     for (var i = 0; i < data.approvals.length; i++) {
  //       if (data.approvals[i].userid === vm.ImatomoValue.profile.id) {
  //         return true;
  //       }
  //     }
  //   }
  // };

  /**
   * 賛同する
   */
  ShitailistController.prototype.approval = function(id) {
    console.log('ShitailistController approval Method');
    $('button').prop('disabled', 'disabled');
    vm.ShitaiesService.approval(id, function() {
      $('button').prop('disabled', '');
    });
  };

  /**
   * キャンセルする
   */
  ShitailistController.prototype.cancel = function(id) {
    console.log('ShitailistController approval Method');
    $('button').prop('disabled', 'disabled');
    vm.ShitaiesService.cancel(id, function() {
      $('button').prop('disabled', '');
    });
  };

  /**
   * 削除ボタン
   */
  ShitailistController.prototype.remove = function(data) {

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
      // 削除実行
      vm.items.$remove(data);
    });
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
    if (data.group === '') {
      return true;
    }

    // グループ一覧が存在しない場合は表示
    if (!vm.groupList) {
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

  ShitailistController.prototype.searchMyApprovals = function(data) {

    if (vm.flag === 0) {
      //「グループ：みんな」の公言は表示
      return true;
    }

    if (vm.flag === 1) {
      // 賛同者がいなかったら非表示
      if (data.userid ===  vm.ImatomoValue.profile.id) {
        return true;
      }
    }

    if (vm.flag === 2) {
      // 賛同者がいなかったら非表示
      if (!data.approvals) {
        return false;
      } else {
        // 自分が賛同していたら表示
        for (var k = 0; k < data.approvals.length; k++) {
          console.log(data.approvals);
          if (data.approvals[k].userid === vm.ImatomoValue.profile.id) {
            return true;
          }
        }
      }
    }
  };

  /**
   * 今日からの日付差からフォーマット変更
   */
  ShitailistController.prototype.dateFormat = function(time) {

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

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
