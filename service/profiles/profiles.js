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

      // /*
      //  * LocalStorage検索
      //  */
      // getStorageProfile: function() {
      //
      //   // ローカルストレージからユーザ情報を取得
      //   var localStorage = window.localStorage;
      //   var user = localStorage.getItem('profile');
      //
      //   // なければ undefined
      //   if (!user) {
      //     return undefined;
      //   }
      //   return JSON.parse(user);
      // },

      /*
       * 検索
       */
      getProfiles: function() {
        return profileArray;
      },

      /*
       * １件検索
       */
      getProfile: function(userid, aftfnc) {
        profileArray.$loaded().then(function(x) {
          for (var i = 0; i < profileArray.length; i++) {
            if (profileArray[i].userid === userid) {
              if (aftfnc) {
                aftfnc(profileArray[i]);
              }
              break;
            }
          }
        });
      },

      // /*
      //  * 登録
      //  */
      // addProfile: function(profile, aftfunc) {
      //
      //   // 登録
      //   profileArray.$add(profile).then(function(ref) {
      //     // 採番されたID
      //     var id = ref.key();
      //     // ローカルストレージに登録
      //     profile.userid = id;
      //     window.localStorage.setItem('profile', JSON.stringify(profile));
      //     if (aftfunc) {
      //       aftfunc(ref);
      //     }
      //   });
      // },

      /*
       * 更新
       */
      modProfile: function(profile, aftfunc) {

        profileArray.$loaded().then(function(x) {
          for (var i = 0; i < profileArray.length; i++) {
            var p = profileArray[i];
            if (p.userid === profile.id) {
              p.username = profile.name;
              p.picture = profile.picture;
              profileArray.$save(p);
              if (aftfunc) {
                aftfunc(p);
              }
              return;
            }
          }
          // 登録
          var addProfile = {
            userid : profile.id,
            username : profile.name,
            picture : profile.picture
          };
          profileArray.$add(addProfile).then(function(ref) {
            if (aftfunc) {
              aftfunc(ref);
            }
          });
        });
      }
    };

    return profilesService;
  }

})();
