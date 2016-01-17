(function() {
  'use strict';

  angular
    .module('imatomo.mock.service.groups', [])
    .factory('GroupsService', GroupsService);

  function GroupsService() {
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
