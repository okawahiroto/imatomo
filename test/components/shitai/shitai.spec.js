(function() {
  'use strict';

  describe('Controller: ShitaiController', function() {

    beforeEach(module('imatomo.components.shitai'));

    var ShitaiController;

    beforeEach(inject(function($controller) {
      ShitaiController = $controller('ShitaiController');
    }));

    describe('ShitaiController', function() {
      it('Test Case', function() {
        ShitaiController.activate();
      });
    });
  });
})();
