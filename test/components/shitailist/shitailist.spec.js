(function() {
  'use strict';

  describe('Controller: ShitailistController', function() {

    beforeEach(module('imatomo.components.shitailist'));

    var ShitailistController;

    beforeEach(inject(function($controller) {
      ShitailistController = $controller('ShitailistController');
    }));

    describe('ShitailistController', function() {
      it('Test Case', function() {
        ShitailistController.activate();
      });
    });
  });
})();
