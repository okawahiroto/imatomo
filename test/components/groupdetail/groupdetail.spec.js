(function() {
  'use strict';

  describe('Controller: GroupdetailController', function() {

    beforeEach(module('imatomo.components.groupdetail'));

    var GroupdetailController;

    beforeEach(inject(function($controller) {
      GroupdetailController = $controller('GroupdetailController');
    }));

    describe('GroupdetailController', function() {
      it('Test Case', function() {
        GroupdetailController.activate();
      });
    });
  });
})();
