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

  ProfileController.$inject = [];

  /**
   * ProfileController
   *
   * @class ProfileController
   * @constructor
   */
  function ProfileController() {
    console.log('ProfileController Constructor');
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
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
