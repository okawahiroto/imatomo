/**
 * Groupdetail Components module.
 *
 * @module imatomo.components.groupdetail
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.groupdetail', [
      'imatomo.service.profiles',
      'imatomo.service.groups'
    ])
    .controller('GroupdetailController', GroupdetailController);

  GroupdetailController.$inject = ['$routeParams', '$location', 'ImatomoValue', 'ProfilesService', 'GroupsService'];

  /**
   * GroupdetailController
   *
   * @class GroupdetailController
   * @constructor
   */
  function GroupdetailController($routeParams, $location, ImatomoValue, ProfilesService, GroupsService) {
    console.log('GroupdetailController Constructor');
    this.id = $routeParams.id;
    this.$location = $location;
    this.ImatomoValue = ImatomoValue;
    this.ProfilesService = ProfilesService;
    this.GroupsService = GroupsService;
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  GroupdetailController.prototype.activate = function() {
    console.log('GroupdetailController activate Method');
    vm = this;

    // グループ取得
    vm.GroupsService.getGroup(vm.id, function(group) {

      vm.ProfilesService.getProfile(group.createuserid, function(profile) {
        if (profile) {
          vm.createusername = profile.username;
        }
      });
      vm.group = group;
    });
  };

  /**
   * 参加する
   */
  GroupdetailController.prototype.apply = function() {
    console.log('GroupdetailController apply Method');

    // サービス実行
    vm.GroupsService.addMember(vm.group.$id);
    vm.$location.path('group');
  };

  /**
   * 解散する
   */
  GroupdetailController.prototype.dissolution = function() {
    console.log('GroupdetailController dissolution Method');

    // サービス実行
    vm.GroupsService.removeGroup(vm.group.$id);
    vm.$location.path('group');
  };

  /**
   * 脱退する
   */
  GroupdetailController.prototype.withdrawal = function() {
    console.log('GroupdetailController withdrawal Method');
    // サービス実行
    vm.GroupsService.removeMember(vm.group.$id, vm.ImatomoValue.profile.id, function() {
      vm.$location.path('group');
    });
  };

  /**
   * 参加するが可能か
   */
  GroupdetailController.prototype.isAbleApply = function() {

    if (!vm.group) {
      return false;
    }

    // 自分のグループなら非表示
    if (vm.group.createuserid === vm.ImatomoValue.profile.id) {
      return false;
    }

    // 既に参加済なら非表示
    for (var i = 0; i < vm.group.members.length; i++) {
      if (vm.group.members[i].userid === vm.ImatomoValue.profile.id) {
        return false;
      }
    }

    return true;
  };

  /**
   * 脱退するが可能か
   */
  GroupdetailController.prototype.isAbleDissolution = function() {

    if (!vm.group) {
      return false;
    }

    // 既に参加済なら表示
    return (vm.group.createuserid === vm.ImatomoValue.profile.id);
  };

  /**
   * 脱退するが可能か
   */
  GroupdetailController.prototype.isAbleWithdrawal = function() {

    if (!vm.group) {
      return false;
    }

    // 既に参加済なら表示
    for (var i = 0; i < vm.group.members.length; i++) {
      if (vm.group.members[i].userid === vm.ImatomoValue.profile.id) {
        return true;
      }
    }

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
