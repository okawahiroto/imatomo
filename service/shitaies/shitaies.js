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

  ShitaiesService.$inject = ['$firebaseArray', 'ImatomoValue', 'ProfilesService', 'toaster'];

  var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/shitaies');

  /**
   * ShitaiesService
   *
   * @class ShitaiesService
   * @constructor
   */
  function ShitaiesService($firebaseArray, ImatomoValue, ProfilesService, toaster) {

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
      approval: function(id, aftfnc) {
        // 更新
        shitaiesArray.$loaded().then(function(x) {
          var s = shitaiesArray.$getRecord(id);
          if (!s.approvals) {
            s.approvals = [];
          }
          s.approvals.push({userid : ImatomoValue.profile.id});
          s.lastApprovalUserid = ImatomoValue.profile.id;
          shitaiesArray.$save(s);
          if (aftfnc) {
            aftfnc();
          }
        });
      },

      /*
       * キャンセルする
       */
      cancel: function(id, aftfnc) {
        // 更新
        shitaiesArray.$loaded().then(function(x) {
          var s = shitaiesArray.$getRecord(id);
          var newApprovals = s.approvals.filter(function(a) {
            return a.userid !== ImatomoValue.profile.id;
          });
          s.approvals = newApprovals;
          s.lastApprovalUserid = '';
          shitaiesArray.$save(s);
          if (aftfnc) {
            aftfnc();
          }
        });
      },

      /*
       * 備考を更新する
       */
      seveComment: function(id, comment) {
        // 更新
        shitaiesArray.$loaded().then(function(x) {
          var s = shitaiesArray.$getRecord(id);
          s.comment = comment;
          shitaiesArray.$save(s);
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

      var shitai = shitaiesArray.$getRecord(event.key);

      // 自分の $add 'child_changed' だったら何もしない
      if (shitaiesService.selfApproval) {
        console.log('自分の $add child_changed だったら何もしない');
        shitaiesService.selfApproval = false;
        return;
      }

      // 賛同する更新じゃなければ無視
      if (!shitai.lastApprovalUserid) {
        console.log('賛同する更新じゃなければ無視');
        return;
      }

      // 自分以外が登録したものなら無視する
      if (shitai.userid !== ImatomoValue.profile.id) {
        console.log('自分以外が登録したものなら無視する');
        return;
      }

      // 参加者を取得
      var newMemberId = shitai.lastApprovalUserid;
      var profiles = ProfilesService.getProfiles();
      profiles.$loaded().then(function(x) {
        for (var i = 0; i < profiles.length; i++) {
          if (profiles[i].userid === newMemberId) {
            toaster.pop('success', '仲間があらわれた！', profiles[i].username + ' さんがあなたに賛同しました。');
            break;
          }
        }
      });

      // 通知
      pushCall(ImatomoValue);

    });

    return shitaiesService;
  }

  /**
   * 通知
   */
  function pushCall(ImatomoValue) {

    // 音ならす
    // var callbell = new Audio($('base').prop('href') + 'audio/linelike.mp3');
    // callbell.play();
    console.log(ImatomoValue.callbell);
    if (ImatomoValue.callbell) {
      var callbell = document.getElementById('pushAudio');
      callbell.play();
    }

    // ぶるぶるさせる
    if (navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate) {
      navigator.vibrate([200, 200, 200, 200, 200]);
    }
  }

})();
