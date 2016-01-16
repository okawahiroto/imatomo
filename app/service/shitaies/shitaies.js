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

  ShitaiesService.$inject = ['$firebaseArray', 'ProfilesService'];

  /**
   * ShitaiesService
   *
   * @class ShitaiesService
   * @constructor
   */
  function ShitaiesService($firebaseArray, ProfilesService) {

    var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/shitaies');
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
      findShitai: function(id) {
        return shitaiesArray.$getRecord(id);
      },

      /*
       * 登録
       */
      addShitai: function(shitai) {
        shitaiesArray.$add(shitai);
      },

      /*
       * 賛同する
       */
      approval: function(id) {
        // 更新
        shitaiesArray.$loaded().then(function(x) {
          var p = shitaiesArray.$getRecord(id);
          if (!p.approvals) {
            p.approvals = [];
          }
          p.approvals.push(ProfilesService.findProfile());
          shitaiesArray.$save(p);
        });
      }
    };

    return shitaiesService;
  }

})();
