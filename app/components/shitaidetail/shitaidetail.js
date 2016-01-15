/**
 * Shitaidetail Components module.
 *
 * @module imatomo.components.shitaidetail
 */
(function () {
  'use strict';

  angular
    .module('imatomo.components.shitaidetail', [])
    .controller('ShitaidetailController', ShitaidetailController);

  ShitaidetailController.$inject = [];

  /**
   * ShitaidetailController
   *
   * @class ShitaidetailController
   * @constructor
   */
  function ShitaidetailController() {
    console.log('ShitaidetailController Constructor');
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  ShitaidetailController.prototype.activate = function() {
    console.log('ShitaidetailController activate Method');
    vm = this;
    var ref = new Firebase('https://resplendent-inferno-2076.firebaseio.com/shitailist');
    var shitailist = vm.$firebaseArray(ref);

    /*for (var sItem in shitailist) {
      var sid = sItem.shitaiid;
      if (sid == $shitaiid) {
        setShitaiItem(sItem);
        //exit;
      }
    }*/
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;

  /**
   * @method setShitaiItem
   * @private
   */
  var setShitaiItem = function (shitaiItem) {
    vm.shitaiid    = shitaiItem.shitaiid;
    vm.userid      = shitaiItem.userid;
    vm.username    = shitaiItem.username;
    vm.title       = shitaiItem.title;
    vm.time        = shitaiItem.time;
    vm.place       = shitaiItem.place;
    vm.comment     = shitaiItem.comment;
    vm.createtimesstamp = shitaiItem.createtimesstamp;
  };

})();
