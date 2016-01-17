/**
 * Groups Service module.
 *
 * @module imatomo.service.groups
 */
(function() {
  'use strict';

  angular
    .module('imatomo.service.groups', [
      'imatomo.service.profiles'
    ])
    .factory('GroupsService', GroupsService);

  GroupsService.$inject = ['$firebaseArray', 'ProfilesService'];

  /**
   * GroupsService
   *
   * @class GroupsService
   * @constructor
   */
  function GroupsService($firebaseArray, ProfilesService) {

    var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/groups');
    var groupsArray = $firebaseArray(ref);

    var groupsService = {

      /*
       * 全件検索
       */
      findGroups: function() {
        return groupsArray;
      },

      /*
       * １件検索
       */
      getGroup: function(id, aftfnc) {
        groupsArray.$loaded().then(function(x) {
          if (aftfnc) {
            aftfnc(groupsArray.$getRecord(id));
          }
        });
      },

      /*
       * 登録
       */
      addGroup: function(group, aftfnc) {
        groupsArray.$add(group).then(function() {
          if (aftfnc) {
            aftfnc();
          }
        });
      },

      /*
       * 参加する
       */
      apply: function(id) {
        groupsArray.$loaded().then(function(x) {
          var g = groupsArray.$getRecord(id);
          if (!g.members) {
            g.members = [];
          }
          var profile =  ProfilesService.getStorageProfile();
          g.members.push({userid : profile.userid, username : profile.userid});
          groupsArray.$save(g);
        });
      }
    };

    return groupsService;
  }

})();
