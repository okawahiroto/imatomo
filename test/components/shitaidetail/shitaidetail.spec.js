(function() {
  'use strict';

  describe('Controller: ShitaidetailController', function() {

    beforeEach(module('imatomo.components.shitaidetail'));

    var ShitaidetailController;

    beforeEach(inject(function($controller) {
      ShitaidetailController = $controller('ShitaidetailController');
    }));

    describe('ShitaidetailController', function() {
      it('Test Case', function() {
        ShitaidetailController.activate();
      });
    });
  });
})();
