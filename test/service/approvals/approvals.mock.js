(function() {
  'use strict';

  angular
    .module('imatomo.mock.service.approvals', [])
    .factory('ApprovalsService', ApprovalsService);

  function ApprovalsService() {
    return {
      some: someSpy
    };
  }

  var someSpy = jasmine.createSpy().and.returnValue(
    function(cb) {
      return result;
    }
  );

  var result = {};
})();
