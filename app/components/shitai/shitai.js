/**
 * Shitai Components module.
 *
 * @module imatomo.components.shitai
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitai', [])
    .controller('ShitaiController', ShitaiController);

  ShitaiController.$inject = ['$firebaseArray', '$location'];

  /**
   * ShitaiController
   *
   * @class ShitaiController
   * @constructor
   */
  function ShitaiController($firebaseArray, $location) {
    console.log('ShitaiController Constructor');
    this.$firebaseArray = $firebaseArray;
    this.$location = $location;
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitaiController.prototype.activate = function() {
    console.log('ShitaiController activate Method');
    vm = this;
  };

  /**
   * @method register
   */
  ShitaiController.prototype.register = function() {
    console.log('ShitaiController register Method');

    // ローカルストレージからユーザ情報を取得
    var localStorage = window.localStorage;
    var user = localStorage.getItem('user');

    // なければ終了
    if (!user) {
      vm.status = 'dengire';
      vm.message = 'ユーザ登録を行ってください。';
      return;
    }

    var userObj = JSON.parse(user);

    // したいID
    var shitaiid = createShitaiId();
    console.info(shitaiid);
    var shitai = {
      shitaiid : shitaiid,
      userid : userObj.userid,
      username : userObj.username,
      title: vm.title,
      time: vm.time,
      place: (vm.place === undefined ? '' : vm.place),
      createtimestamp : Firebase.ServerValue.TIMESTAMP
    };

    var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/shitailist');
    // Firebaseに追加

    var messages = vm.$firebaseArray(ref);
    messages.$add(shitai);

    // shitailistへ
    vm.$location.path('shitailist');
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;

  /**
   * @method closeAlert
   */
  ShitaiController.prototype.closeAlert = function () {
    console.log('close');
    vm.status = '';
    vm.message = '';
  };

  /**
   * 採番
   */
  var createShitaiId = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

})();
