'use strict';

describe('Directive: userpictureDirective', function() {

  beforeEach(module('imatomo.directive.userpicture'));

  var element, scope, $rootScope, $compile;
  var compareHTML   = '';
  var resultHTML    = '<div>' + compareHTML + '</div>';
  var directiveHTML = '';

  beforeEach(inject(function(_$rootScope_, _$compile_, $templateCache) {
    $rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $templateCache.put('directives/userpicture/userpicture.html', resultHTML);
  }));

  describe('someThing', function() {

    beforeEach(function Compile() {

    });

    it ('someThing', function () {

    });
  });
});
