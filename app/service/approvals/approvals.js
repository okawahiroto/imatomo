/**
 * Approvals Service module.
 *
 * @module imatomo.service.approvals
 */
(function() {
  'use strict';

  angular
    .module('imatomo.service.approvals', [])
    .factory('ApprovalsService', ApprovalsService);

  ApprovalsService.$inject = [];

  /**
   * ApprovalsService
   *
   * @class ApprovalsService
   * @constructor
   */
  function ApprovalsService() {

    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    var someProperty = {};

    var approvalsService = {
      someMethod: function() {
        return;
      }
    };

    return approvalsService;
  }

})();
