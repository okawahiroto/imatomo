(function() {
  'use strict';

  angular
    .module('imatomo.mock.service.profiles', [])
    .factory('ProfilesService', ProfilesService);

  function ProfilesService() {
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
