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
      ProfilesService.getProfile(attrs.userid, function(profile) {
        if (profile) {
          element.append(profile.username);
        }
      });
    };
  }
}());
