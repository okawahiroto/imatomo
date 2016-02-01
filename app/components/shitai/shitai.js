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
      'imatomo.service.groups'
    ])
    .controller('ShitaiController', ShitaiController);

  ShitaiController.$inject = ['ImatomoValue', '$location', 'ShitaiesService', 'GroupsService'];

  /**
   * ShitaiController
   *
   * @class ShitaiController
   * @constructor
   */
  function ShitaiController(ImatomoValue, $location, ShitaiesService, GroupsService) {
    console.log('ShitaiController Constructor');
    this.$location = $location;
    this.ImatomoValue = ImatomoValue;
    this.ShitaiesService = ShitaiesService;
    this.GroupsService = GroupsService;
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

    // 表示用グループ
    var newgroupList = [];

    // 「みんな」作成
    var allgroup = {
      groupid: '',
      groupname: 'みんな'
    };
    newgroupList.push(allgroup);

    // グループ一覧取得（自身が所属しているグループのみ）
    var groupList = vm.GroupsService.findGroups();
    groupList.$loaded().then(function (x) {
      for (var i = 0; i < groupList.length; i++) {
        for (var j = 0; j < groupList[i].members.length; j++) {
          console.log('get ImatomoValue.profile');
          if (groupList[i].members[j].userid === vm.ImatomoValue.profile.id) {
            var wg = {
              groupid: groupList[i].$id,
              groupname: groupList[i].groupname
            };
            newgroupList.push(wg);
          }
        }
      }
      vm.groupList = newgroupList;
      vm.groupList.groupid = vm.groupList[0].groupid;
    });

    // 期限に関する設定
    var currentTimestamp = new Date();
    vm.today = currentTimestamp;
    vm.time = new Date().setHours(currentTimestamp.getHours() + 1, 0, 0, 0);
  };

  /**
   * @method register
   */
  ShitaiController.prototype.register = function() {
    console.log('ShitaiController register Method');
    // 期限
    var limitDate = vm.date;
    limitDate.setHours(new Date(vm.time).getHours(), new Date(vm.time).getMinutes(), 59, 0);
    if (limitDate.getTime() < new Date().getTime()) {
      vm.status = 'dengire';
      vm.message = '期限に過去が設定されています。';
      return;
    }

    var shitai = {
      userid : vm.ImatomoValue.profile.id,
      title: vm.title,
      time: limitDate.getTime(),
      comment : (!vm.comment ? '' : vm.comment),
      place: (!vm.place ? '' : vm.place),
      group: (!vm.groupList.groupid ? '' : vm.groupList.groupid),
    };

    // Firebaseに追加
    vm.ShitaiesService.addShitai(shitai, function() {
      // shitailistへ遷移
      vm.$location.path('shitailist');
    });
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
