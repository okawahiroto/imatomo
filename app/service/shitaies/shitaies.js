/**
 * Shitaies Service module.
 *
 * @module imatomo.service.shitaies
 */
(function() {
  'use strict';

  angular
    .module('imatomo.service.shitaies', [])
    .factory('ShitaiesService', ShitaiesService);

  ShitaiesService.$inject = ['$firebaseArray'];

  /**
   * ShitaiesService
   *
   * @class ShitaiesService
   * @constructor
   */
  function ShitaiesService($firebaseArray) {

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
      }
    };

    return shitaiesService;
  }

})();
