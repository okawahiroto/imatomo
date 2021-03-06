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

  GroupsService.$inject = ['$firebaseArray', 'ImatomoValue'];

  /**
   * GroupsService
   *
   * @class GroupsService
   * @constructor
   */
  function GroupsService($firebaseArray, ImatomoValue) {

    var ref = new Firebase('https://imatomo.firebaseio.com/groups');
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
       * メンバー追加
       */
      addMember: function(id) {
        groupsArray.$loaded().then(function(x) {
          var g = groupsArray.$getRecord(id);
          if (!g.members) {
            g.members = [];
          }
          g.members.push({userid : ImatomoValue.profile.id, username : ImatomoValue.profile.name});
          groupsArray.$save(g);
        });
      },

      /*
       * メンバー削除
       */
      removeMember: function(id, userid, aftfnc) {
        groupsArray.$loaded().then(function(x) {
          var g = groupsArray.$getRecord(id);
          var newMembers = g.members.filter(function(m) {
            return m.userid !== ImatomoValue.profile.id;
          });
          if (newMembers.length === 0)  {
            groupsService.removeGroup(id, aftfnc);
            return;
          }
          g.members = newMembers;
          groupsArray.$save(g);
          if (aftfnc) {
            aftfnc();
          }
        });
      },

      /*
       * 削除する
       */
      removeGroup: function(id, aftfnc) {
        groupsArray.$loaded().then(function(x) {
          var g = groupsArray.$getRecord(id);
          if (g) {
            groupsArray.$remove(g).then(function(x) {
              if (aftfnc) {
                aftfnc();
              }
            });
          }
        });
      }
    };

    return groupsService;
  }

})();
