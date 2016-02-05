/**
 * This is imatomo module.
 *
 * @module imatomo
 */
(function () {
  'use strict';

  angular
    .module('imatomo.confirm', [])
    .controller('ImatomoConfirm', ConfirmController);

  ConfirmController.$inject = ['$scope', '$uibModalInstance', 'message'];

  /**
   * ConfirmController
   *
   * @class ConfirmController
   * @main imatomo
   * @constructor
   */
  function ConfirmController ($scope, $uibModalInstance, message) {
    $scope.message = message;
    $scope.ok = function() {
      $uibModalInstance.dismiss();
    };
    $scope.cancel = function() {
      $uibModalInstance.close();
    };
  }

})();
