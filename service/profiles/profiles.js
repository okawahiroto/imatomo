/**
 * Profiles Service module.
 *
 * @module imatomo.service.profiles
 */
(function() {
  'use strict';

  angular
    .module('imatomo.service.profiles', [])
    .factory('ProfilesService', ProfilesService);

  ProfilesService.$inject = ['$firebaseArray'];

  /**
   * ProfilesService
   *
   * @class ProfilesService
   * @constructor
   */
  function ProfilesService($firebaseArray) {

    var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/profiles');
    var profileArray = $firebaseArray(ref);

    var profilesService = {

      /*
       * 検索
       */
      findProfile: function() {

        // ローカルストレージからユーザ情報を取得
        var localStorage = window.localStorage;
        var user = localStorage.getItem('profile');

        // なければ undefined
        if (!user) {
          return undefined;
        }
        return JSON.parse(user);
      },

      /*
       * 登録
       */
      addProfile: function(profile, aftfunc) {

        // 登録
        profileArray.$add(profile).then(function(ref) {
          // 採番されたID
          var id = ref.key();
          // ローカルストレージに登録
          profile.userid = id;
          window.localStorage.setItem('profile', JSON.stringify(profile));

          aftfunc();
        });
      },

      /*
       * 更新
       */
      modProfile: function(profile, aftfunc) {

        // ユーザID
        var userid = this.findProfile().userid;

        // 更新
        profileArray.$loaded().then(function(x) {
          var p = profileArray.$getRecord(userid);
          p.username = profile.username;
          profileArray.$save(p);
          // ローカルストレージを更新
          profile.userid = userid;
          window.localStorage.setItem('profile', JSON.stringify(profile));

          aftfunc();
        });
      }
    };

    return profilesService;
  }

})();
