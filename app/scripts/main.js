/**
 * This is imatomo module.
 *
 * @module imatomo
 */
(function () {
  'use strict';

  angular
    .module('imatomo', [
      'ngNewRouter',
      'imatomo.config',
      'imatomo.value',
      'imatomo.confirm',
      'firebase',
      'toaster',
      'ngAnimate',
      'ngResource',
      'ui.bootstrap',
      'directive.g+signin',
      'imatomo.directives.userid',
      'imatomo.directives.userpicture',
      'imatomo.components.shitailist',
      'imatomo.components.shitai',
      'imatomo.components.group',
      'imatomo.components.profile',
      'imatomo.components.shitaidetail',
      'imatomo.components.groupdetail',
      'imatomo.service.profiles'
    ])
    .controller('AppController', AppController);

  AppController.$routeConfig = [
    {path: '/',       redirectTo: '/shitailist'},
    {path: '/shitailist',    component: 'shitailist'},
    {path: '/shitai',    component: 'shitai'},
    {path: '/group',    component: 'group'},
    {path: '/profile',    component: 'profile'},
    {path: '/shitaidetail/:id',    component: 'shitaidetail'},
    {path: '/groupdetail/:id',    component: 'groupdetail'}
  ];

  AppController.$inject = ['$scope', '$resource', '$uibModal', 'ImatomoValue', 'ProfilesService'];

  /**
   * AppController
   *
   * @class AppController
   * @main imatomo
   * @constructor
   */
  function AppController ($scope, $resource, $uibModal, ImatomoValue, ProfilesService) {
    vm = this;
    vm.ImatomoValue = ImatomoValue;
    $scope.$on('event:google-plus-signin-success', function (event, authResult) {
      var resouece = $resource('https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + authResult.access_token, {});
      var userinfomation = resouece.get().$promise;

      userinfomation
        .then(function(profile) {
          if (!profile.name) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html'
            });
            return;
          }
          ProfilesService.modProfile(profile, function() {
            ImatomoValue.profile = profile;
          });
        })
        .catch(function(x) {
          console.log(x);
        });
    });

    $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
      console.log(authResult);
    });

  }

  /*
   * ぴんぽーん の設定
   */
  AppController.prototype.setCallbell = function() {
    var callbell = document.getElementById('pushAudio');
    callbell.load();
    vm.ImatomoValue.callbell = (vm.callbell === 1);
  };

  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;

})();
