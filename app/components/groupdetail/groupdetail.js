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

  GroupdetailController.$inject = ['$routeParams', '$location', 'ProfilesService', 'GroupsService'];

  /**
   * GroupdetailController
   *
   * @class GroupdetailController
   * @constructor
   */
  function GroupdetailController($routeParams, $location, ProfilesService, GroupsService) {
    console.log('GroupdetailController Constructor');
    this.id = $routeParams.id;
    this.$location = $location;
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

    // プロファイル一覧
    var profiles = vm.ProfilesService.getProfiles();

    vm.profile = vm.ProfilesService.getStorageProfile();

    // グループ取得
    vm.GroupsService.getGroup(vm.id, function(group) {
      profiles.$loaded().then(function (x) {
        if (group.members) {
          for (var i = 0; i < group.members.length; i++) {
            var profile = profiles.$getRecord(group.members[i].userid);
            if (profile) {
              group.members[i].username = profile.username;
            }
          }
        }

        var creator = profiles.$getRecord(group.createuserid);
        if (creator) {
          vm.createusername = creator.username;
        }
      });

      vm.groupname = group.groupname;
      vm.members = group.members;
      vm.id = group.$id;
    });
  };

  /**
   * 参加する
   */
  GroupdetailController.prototype.apply = function() {
    console.log('GroupdetailController apply Method');

    // サービス実行
    vm.GroupsService.apply(vm.id);

    vm.$location.path('group');
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
