/**
 * Profile Components module.
 *
 * @module imatomo.components.profile
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.profile', [])
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$location'];

  /**
   * ProfileController
   *
   * @class ProfileController
   * @constructor
   */
  function ProfileController($location) {
    console.log('ProfileController Constructor');
    this.$location = $location;
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ProfileController.prototype.activate = function() {
    console.log('ProfileController activate Method');
    vm = this;

    // ローカルストレージからユーザ情報を取得
    var localStorage = window.localStorage;
    var user = localStorage.getItem('user');

    // なければ新規フラグを立てて終了
    if (!user) {
      vm.status = 'new';
      return;
    }
    var userObj = JSON.parse(user);
    vm.userid = userObj.userid;
    vm.username = userObj.username;
  };

  /**
   * @method register
   */
  ProfileController.prototype.register = function() {
    console.log('ProfileController register Method');
    var user = {
      userid: vm.userid,
      username: vm.username
    };

    // ローカルストレージにユーザ情報を取得
    var localStorage = window.localStorage;
    localStorage.setItem('user', JSON.stringify(user));

    vm.status = undefined;
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
})();
