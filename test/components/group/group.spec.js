(function() {
  'use strict';

  describe('Controller: GroupController', function() {

    beforeEach(module('imatomo.components.group'));

    var GroupController;

    beforeEach(inject(function($controller) {
      GroupController = $controller('GroupController');
    }));

    describe('GroupController', function() {
      it('Test Case', function() {
        GroupController.activate();
      });
    });
  });
})();
