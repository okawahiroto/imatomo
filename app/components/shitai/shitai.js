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
      'imatomo.service.profiles',
      'imatomo.service.groups'
    ])
    .controller('ShitaiController', ShitaiController);

  ShitaiController.$inject = ['$location', 'ShitaiesService', 'ProfilesService', 'GroupsService'];

  /**
   * ShitaiController
   *
   * @class ShitaiController
   * @constructor
   */
  function ShitaiController($location, ShitaiesService, ProfilesService, GroupsService) {
    console.log('ShitaiController Constructor');
    this.$location = $location;
    this.ShitaiesService = ShitaiesService;
    this.ProfilesService = ProfilesService;
    this.GroupsService = GroupsService;
    this.profile = ProfilesService.getStorageProfile();
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
      $id: '',
      groupname: 'みんな'
    };
    newgroupList.push(allgroup);

    // firebaseグループ作成
    var groupList = vm.GroupsService.findGroups();
    for (var i = 0; i < groupList.length; i++) {
      var wg = {
        $id: groupList[i].$id,
        groupname: groupList[i].groupname
      };
      newgroupList.push(wg);
    }
    for (var j = 0; j < newgroupList.length; j++) {
      console.log('newgroupList[' + j + '].groupname:' + newgroupList[j].groupname);
    }
    vm.groupList = newgroupList;
    vm.groupList.$id = vm.groupList[0].$id;

    vm.today = new Date();
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
      time: vm.time.getTime(),
      comment : (vm.comment === undefined ? '' : vm.comment),
      place: (vm.place === undefined ? '' : vm.place),
      group: (vm.groupList.$id === undefined ? '' : vm.groupList.$id),
      createtimestamp : Firebase.ServerValue.TIMESTAMP
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

  ShitaiController.prototype.searchMember = function(group) {
    console.log('ShitaiController searchMember Method');
    for (var i = 0; i < group.members.length; i++) {
      if (group.members[i].userid === vm.profile.userid) {
        return true;
      }
    }
    return false;
  };

})();
