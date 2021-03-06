/**
 * Group Components module.
 *
 * @module imatomo.components.group
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.group', [
      'imatomo.service.groups'
    ])
    .controller('GroupController', GroupController);

  GroupController.$inject = ['$location', 'ImatomoValue', 'GroupsService'];

  /**
   * GroupController
   *
   * @class GroupController
   * @constructor
   */
  function GroupController($location, ImatomoValue, GroupsService) {
    console.log('GroupController Constructor');
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
  GroupController.prototype.activate = function() {
    console.log('GroupController activate Method');
    vm = this;

    var groups = vm.GroupsService.findGroups();
    vm.items = groups;
    vm.criteria = {creatorFilter : undefined, memberFilted : false};
  };

  /**
   * 追加する
   */
  GroupController.prototype.register = function() {

    var group = {
      createuserid : vm.ImatomoValue.profile.id,
      groupname: vm.groupname,
      members : [{userid : vm.ImatomoValue.profile.id, username : vm.ImatomoValue.profile.name}]
    };

    // Firebaseに追加
    vm.GroupsService.addGroup(group);
    vm.groupname = '';
  };

  /**
   * 詳細
   */
  GroupController.prototype.moveDetail = function(id) {
    vm.$location.path('/groupdetail/' + id);
  };

  /**
   * 自分がメンバーになってるグループに絞る
   */
  GroupController.prototype.filtedMember = function(data) {

    if (!vm.criteria.memberFilted) {
      return true;
    }

    if (!data.members) {
      return false;
    }

    for (var i = 0; i < data.members.length; i++) {
      if (data.members[i].userid === vm.ImatomoValue.profile.id) {
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
