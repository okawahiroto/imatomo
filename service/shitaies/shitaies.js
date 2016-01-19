/**
 * Shitaies Service module.
 *
 * @module imatomo.service.shitaies
 */
(function() {
  'use strict';

  angular
    .module('imatomo.service.shitaies', [
      'imatomo.service.profiles'
    ])
    .factory('ShitaiesService', ShitaiesService);

  ShitaiesService.$inject = ['$firebaseArray', 'ProfilesService', 'toaster'];

  var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/shitaies');

  /**
   * ShitaiesService
   *
   * @class ShitaiesService
   * @constructor
   */
  function ShitaiesService($firebaseArray, ProfilesService, toaster) {

    var shitaiesArray = $firebaseArray(ref);

    var shitaiesService = {

      /*
       * 全件検索
       */
      findShitaies: function() {
        return shitaiesArray;
      },

      /*
       * １件検索
       */
      getShitai: function(id, aftfnc) {
        shitaiesArray.$loaded().then(function(x) {
          if (aftfnc) {
            aftfnc(shitaiesArray.$getRecord(id));
          }
        });
      },

      /*
       * 登録
       */
      addShitai: function(shitai, aftfnc) {
        shitaiesService.selfApproval = true;
        shitaiesArray.$add(shitai).then(function(x) {
          if (aftfnc) {
            aftfnc();
          }
        });
      },

      /*
       * 賛同する
       */
      approval: function(id) {
        // 更新
        shitaiesArray.$loaded().then(function(x) {
          var profile =  ProfilesService.getStorageProfile();
          var p = shitaiesArray.$getRecord(id);
          if (!p.approvals) {
            p.approvals = [];
          }
          p.approvals.push({userid : profile.userid});
          p.lastApprovalUserid = profile.userid;
          shitaiesArray.$save(p);
        });
      },

      /*
       * キャンセルする
       */
      cancel: function(id, aftfnc) {
        // 更新
        shitaiesArray.$loaded().then(function(x) {
          var profile =  ProfilesService.getStorageProfile();
          var s = shitaiesArray.$getRecord(id);
          var newApprovals = s.approvals.filter(function(a) {
            return a.userid !== profile.userid;
          });
          s.approvals = newApprovals;
          shitaiesArray.$save(s);
          if (aftfnc) {
            aftfnc();
          }
        });
      }
    };

    // 自分が登録したときに、$addなのに $watch 'child_changed' が発火するためフラグ制御...
    Object.defineProperty(shitaiesService, 'selfApproval', {
      value: false,
      writable: true
    });

    // 賛同の検知
    shitaiesArray.$watch(function(event) {

      if (event.event !== 'child_changed') {
        return;
      }

      var profile =  ProfilesService.getStorageProfile();
      var shitai = shitaiesArray.$getRecord(event.key);

      // 賛同する更新じゃなければ無視
      console.log('shitai.lastApprovalUserid = ' + shitai.lastApprovalUserid);
      if (!shitai.lastApprovalUserid) {
        return;
      }

      // 自分以外が登録したものなら無視する
      if (shitai.userid !== profile.userid) {
        return;
      }

      // 自分の $add 'child_changed' だったら何もしない
      if (shitaiesService.selfApproval) {
        shitaiesService.selfApproval = false;
        return;
      }

      // 参加者を取得
      var newMemberId = shitai.lastApprovalUserid;
      var newMember = ProfilesService.getProfiles().$getRecord(newMemberId);
      toaster.pop('success', '仲間があらわれた！', newMember.username + ' さんがあなたに賛同しました。');

      // 最終賛同者をすぐさまクリア
      shitai.lastApprovalUserid = '';
      shitaiesArray.$sve(shitai);

      // 音ならす
      var callbell = new Audio($('base').prop('href') + 'audio/linelike.mp3');
      callbell.play();
    });

    return shitaiesService;
  }

})();
