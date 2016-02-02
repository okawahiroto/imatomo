/**
 * UserpuctureDirective module.
 *
 * @module imatomo.directives.userpicture
 */
(function () {
  'use strict';

  angular
    .module('imatomo.directives.userpicture', [
      'imatomo.service.profiles'
    ])
    .directive('userpicture', UserpictureDirective);

  UserpictureDirective.$inject = ['ProfilesService'];

  function UserpictureDirective(ProfilesService) {
    return function(scope, element, attrs) {
      console.log(attrs.userpicture);
      ProfilesService.getProfile(attrs.userpicture, function(profile) {
        if (profile) {
          element.append('<img src="' + profile.picture + '" width="40" />&nbsp;');
        }
      });
    };
  }
}());
