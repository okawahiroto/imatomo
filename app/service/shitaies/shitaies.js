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
          var s = shitaiesArray.$getRecord(id);
          if (!s.approvals) {
            s.approvals = [];
          }
          s.approvals.push({userid : profile.userid});
          s.lastApprovalUserid = profile.userid;
          shitaiesArray.$save(s);
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
          s.lastApprovalUserid = '';
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

      console.log('event.event=' + event.event);
      if (event.event !== 'child_changed') {
        return;
      }

      var profile =  ProfilesService.getStorageProfile();
      var shitai = shitaiesArray.$getRecord(event.key);

      // 自分の $add 'child_changed' だったら何もしない
      if (shitaiesService.selfApproval) {
        console.log('shitaiesService.selfApproval=' + shitaiesService.selfApproval);
        console.log('自分の $add child_changed だったら何もしない');
        shitaiesService.selfApproval = false;
        return;
      }

      // 賛同する更新じゃなければ無視
      console.log('shitai.lastApprovalUserid = ' + shitai.lastApprovalUserid);
      if (!shitai.lastApprovalUserid) {
        console.log('賛同する更新じゃなければ無視');
        return;
      }

      // 自分以外が登録したものなら無視する
      if (shitai.userid !== profile.userid) {
        console.log(shitai.userid + '!==' + profile.userid);
        console.log('自分以外が登録したものなら無視する');
        return;
      }

      // 参加者を取得
      var newMemberId = shitai.lastApprovalUserid;
      var newMember = ProfilesService.getProfiles().$getRecord(newMemberId);
      toaster.pop('success', '仲間があらわれた！', newMember.username + ' さんがあなたに賛同しました。');

      console.log('仲間があらわれた！！！！！！！！！！！！！！！');

      // 最終賛同者をすぐさまクリア
      shitai.lastApprovalUserid = '';
      shitaiesArray.$save(shitai);

      // 音ならす
      var callbell = new Audio($('base').prop('href') + 'audio/linelike.mp3');
      callbell.play();
    });

    return shitaiesService;
  }

})();
