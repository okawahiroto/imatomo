(function() {
  'use strict';

  describe('Controller: ProfileController', function() {

    beforeEach(module('imatomo.components.profile'));

    var ProfileController;

    beforeEach(inject(function($controller) {
      ProfileController = $controller('ProfileController');
    }));

    describe('ProfileController', function() {
      it('Test Case', function() {
        ProfileController.activate();
      });
    });
  });
})();
