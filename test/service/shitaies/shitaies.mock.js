(function() {
  'use strict';

  angular
    .module('imatomo.mock.service.shitaies', [])
    .factory('ShitaiesService', ShitaiesService);

  function ShitaiesService() {
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
