/**
 * UseridDirective module.
 *
 * @module imatomo.directives.userid
 */
(function () {
  'use strict';

  angular
    .module('imatomo.directives.userid', [
      'imatomo.service.profiles'
    ])
    .directive('userid', UseridDirective);

  UseridDirective.$inject = ['ProfilesService'];

  function UseridDirective(ProfilesService) {
    return function(scope, element, attrs) {
      var profiles = ProfilesService.getProfiles();
      ProfilesService.getProfiles().$loaded().then(function (x) {
        var profile = profiles.$getRecord(attrs.userid);
        if (profile) {
          element.append(profile.username);
        }
      });
    };
  }
}());
