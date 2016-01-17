!function(){"use strict";function a(){console.log("GroupController Constructor")}angular.module("imatomo.components.group",[]).controller("GroupController",a),a.$inject=[],a.prototype.activate=function(){console.log("GroupController activate Method"),b=this};var b}(),function(){"use strict";function a(){console.log("GroupdetailController Constructor")}angular.module("imatomo.components.groupdetail",[]).controller("GroupdetailController",a),a.$inject=[],a.prototype.activate=function(){console.log("GroupdetailController activate Method"),b=this};var b}(),function(){"use strict";function a(a,b){console.log("ProfileController Constructor"),this.$location=a,this.ProfilesService=b}angular.module("imatomo.components.profile",["imatomo.service.profiles"]).controller("ProfileController",a),a.$inject=["$location","ProfilesService"],a.prototype.activate=function(){console.log("ProfileController activate Method"),b=this;var a=b.ProfilesService.getStorageProfile();return a?void(b.username=a.username):void(b.mode="new")},a.prototype.register=function(){console.log("ProfileController register Method");var a={username:b.username},c=function(){b.$location.path("shitailist")};"new"===b.mode?b.ProfilesService.addProfile(a,c):b.ProfilesService.modProfile(a,c)},a.prototype.closeAlert=function(){console.log("close"),b.status="",b.message=""};var b}(),function(){"use strict";function a(a,b,c){console.log("ShitaiController Constructor"),this.$location=a,this.ShitaiesService=b,this.ProfilesService=c}angular.module("imatomo.components.shitai",["imatomo.service.shitaies","imatomo.service.profiles"]).controller("ShitaiController",a),a.$inject=["$location","ShitaiesService","ProfilesService"],a.prototype.activate=function(){console.log("ShitaiController activate Method"),b=this},a.prototype.register=function(){console.log("ShitaiController register Method");var a=b.ProfilesService.getStorageProfile();if(!a)return b.status="dengire",void(b.message="ユーザ登録を行ってください。");var c={userid:a.userid,username:a.username,title:b.title,time:b.time,comment:void 0===b.comment?"":b.comment,place:void 0===b.place?"":b.place,createtimestamp:Firebase.ServerValue.TIMESTAMP};b.ShitaiesService.addShitai(c),b.$location.path("shitailist")};var b;a.prototype.closeAlert=function(){console.log("close"),b.status="",b.message=""}}(),function(){"use strict";function a(a,b,c){console.log("ShitaidetailController Constructor"),this.id=a.id,this.ShitaiesService=b,this.ProfilesService=c}angular.module("imatomo.components.shitaidetail",["imatomo.service.shitaies","imatomo.service.profiles"]).controller("ShitaidetailController",a),a.$inject=["$routeParams","ShitaiesService","ProfilesService"],a.prototype.activate=function(){console.log("ShitaidetailController activate Method"),b=this,b.ShitaiesService.findShitai(b.id,c)};var b,c=function(a){b.id=a.$id,b.userid=a.userid,b.username=a.username,b.title=a.title,b.time=a.time,b.place=a.place,b.comment=a.comment,b.createtimesstamp=a.createtimesstamp}}(),function(){"use strict";function a(a,b,c){console.log("ShitailistController Constructor"),this.ShitaiesService=b,this.ProfilesService=c,this.$location=a}angular.module("imatomo.components.shitailist",["imatomo.service.shitaies","imatomo.service.profiles"]).controller("ShitailistController",a),a.$inject=["$location","ShitaiesService","ProfilesService"],a.prototype.activate=function(){console.log("ShitailistController activate Method"),b=this;var a=b.ShitaiesService.findShitaies();b.items=a,b.profile=b.ProfilesService.getStorageProfile()},a.prototype.approval=function(a){console.log("ShitailistController approval Method"),b.ShitaiesService.approval(a)},a.prototype.isApproval=function(a){if(console.log("ShitailistController isApproval Method"),!b.profile)return console.log("vm.profile not exists"),!1;if(a.userid===b.profile.userid)return console.log("it is my shitai"),!1;if(!a.approvals)return console.log("approvals is empty"),!0;var c=!0;return a.approvals.forEach(function(a){a.userid===b.profile.userid&&(console.log("already approval"),c=!1)}),c},a.prototype.moveDetail=function(a){console.log("ShitailistController moveDetail Method"),b.$location.path("/shitaidetail/"+a)};var b}(),function(){"use strict";function a(a){a.html5Mode(!0)}angular.module("imatomo.config",[]).config(a),a.$inject=["$locationProvider"]}(),function(){"use strict";function a(a){var b=a("/api/gruntfiles",{query:{transformResponse:function(a){return angular.fromJson(a)}}});return b}angular.module("imatomo.service.gruntfiles",["ngResource"]).factory("GruntfilesService",a),a.$inject=["$resource"]}(),function(){"use strict";function a(a){var b=new Firebase("https://resplendent-inferno-2076.firebaseio.com/profiles"),c=a(b),d={getStorageProfile:function(){var a=window.localStorage,b=a.getItem("profile");return b?JSON.parse(b):void 0},getProfiles:function(){},addProfile:function(a,b){c.$add(a).then(function(c){var d=c.key();a.userid=d,window.localStorage.setItem("profile",JSON.stringify(a)),b()})},modProfile:function(a,b){var d=this.getStorageProfile().userid;c.$loaded().then(function(e){var f=c.$getRecord(d);f.username=a.username,c.$save(f),a.userid=d,window.localStorage.setItem("profile",JSON.stringify(a)),b()})}};return d}angular.module("imatomo.service.profiles",[]).factory("ProfilesService",a),a.$inject=["$firebaseArray"]}(),function(){"use strict";function a(a,b){var c=new Firebase("https://resplendent-inferno-2076.firebaseio.com/shitaies"),d=a(c),e={findShitaies:function(){return d},findShitai:function(a,b){d.$loaded().then(function(c){b(d.$getRecord(a))})},addShitai:function(a){d.$add(a)},approval:function(a){d.$loaded().then(function(c){var e=d.$getRecord(a);e.approvals||(e.approvals=[]),e.approvals.push(b.getStorageProfile()),d.$save(e)})}};return e}angular.module("imatomo.service.shitaies",["imatomo.service.profiles"]).factory("ShitaiesService",a),a.$inject=["$firebaseArray","ProfilesService"]}(),function(){"use strict";function a(){}angular.module("imatomo",["ngNewRouter","imatomo.config","firebase","imatomo.components.shitailist","imatomo.components.shitai","imatomo.components.group","imatomo.components.profile","imatomo.components.shitaidetail","imatomo.components.groupdetail"]).controller("AppController",a),a.$routeConfig=[{path:"/",redirectTo:"/shitailist"},{path:"/shitailist",component:"shitailist"},{path:"/shitai",component:"shitai"},{path:"/group",component:"group"},{path:"/profile",component:"profile"},{path:"/shitaidetail/:id",component:"shitaidetail"},{path:"/groupdetail",component:"groupdetail"}],a.$inject=[]}();