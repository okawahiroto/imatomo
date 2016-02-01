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
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;

  /**
   * @method closeAlert
   */
  GroupController.prototype.closeAlert = function () {
    console.log('close');
    vm.status = '';
    vm.message = '';
  };
})();
