!function(){"use strict";function a(a,b,c){console.log("GroupController Constructor"),this.$location=a,this.ImatomoValue=b,this.GroupsService=c}angular.module("imatomo.components.group",["imatomo.service.groups"]).controller("GroupController",a),a.$inject=["$location","ImatomoValue","GroupsService"],a.prototype.activate=function(){console.log("GroupController activate Method"),b=this;var a=b.GroupsService.findGroups();b.items=a},a.prototype.register=function(){var a={createuserid:b.ImatomoValue.profile.id,groupname:b.groupname,members:[{userid:b.ImatomoValue.profile.id,username:b.ImatomoValue.profile.name}]};b.GroupsService.addGroup(a),b.groupname=""},a.prototype.moveDetail=function(a){b.$location.path("/groupdetail/"+a)};var b;a.prototype.closeAlert=function(){console.log("close"),b.status="",b.message=""}}(),function(){"use strict";function a(a,b,c,d,e){console.log("GroupdetailController Constructor"),this.id=a.id,this.$location=b,this.ImatomoValue=c,this.ProfilesService=d,this.GroupsService=e}angular.module("imatomo.components.groupdetail",["imatomo.service.profiles","imatomo.service.groups"]).controller("GroupdetailController",a),a.$inject=["$routeParams","$location","ImatomoValue","ProfilesService","GroupsService"],a.prototype.activate=function(){console.log("GroupdetailController activate Method"),b=this,b.GroupsService.getGroup(b.id,function(a){b.ProfilesService.getProfile(a.createuserid,function(a){a&&(b.createusername=a.username)}),b.group=a})},a.prototype.apply=function(){console.log("GroupdetailController apply Method"),b.GroupsService.addMember(b.group.$id),b.$location.path("group")},a.prototype.dissolution=function(){console.log("GroupdetailController dissolution Method"),b.GroupsService.removeGroup(b.group.$id),b.$location.path("group")},a.prototype.withdrawal=function(){console.log("GroupdetailController withdrawal Method"),b.GroupsService.removeMember(b.group.$id,b.ImatomoValue.profile.id,function(){b.$location.path("group")})},a.prototype.isAbleApply=function(){if(!b.group)return!1;if(b.group.createuserid===b.ImatomoValue.profile.id)return!1;for(var a=0;a<b.group.members.length;a++)if(b.group.members[a].userid===b.ImatomoValue.profile.id)return!1;return!0},a.prototype.isAbleDissolution=function(){return b.group?b.group.createuserid===b.ImatomoValue.profile.id:!1},a.prototype.isAbleWithdrawal=function(){if(!b.group)return!1;for(var a=0;a<b.group.members.length;a++)if(b.group.members[a].userid===b.ImatomoValue.profile.id)return!0;return!1};var b}(),function(){"use strict";function a(a,b){console.log("ProfileController Constructor"),this.$location=a,this.ProfilesService=b}angular.module("imatomo.components.profile",["imatomo.service.profiles"]).controller("ProfileController",a),a.$inject=["$location","ProfilesService"],a.prototype.activate=function(){console.log("ProfileController activate Method"),b=this;var a=b.ProfilesService.getStorageProfile();return a?void(b.username=a.username):void(b.mode="new")},a.prototype.register=function(){console.log("ProfileController register Method");var a={username:b.username},c=function(a){b.$location.path("shitailist")};"new"===b.mode?b.ProfilesService.addProfile(a,c):b.ProfilesService.modProfile(a,c)},a.prototype.closeAlert=function(){console.log("close"),b.status="",b.message=""};var b}(),function(){"use strict";function a(a,b,c,d){console.log("ShitaiController Constructor"),this.$location=b,this.ImatomoValue=a,this.ShitaiesService=c,this.GroupsService=d}angular.module("imatomo.components.shitai",["imatomo.service.shitaies","imatomo.service.groups"]).controller("ShitaiController",a),a.$inject=["ImatomoValue","$location","ShitaiesService","GroupsService"],a.prototype.activate=function(){console.log("ShitaiController activate Method"),b=this;var a=[],c={groupid:"",groupname:"みんな"};a.push(c);var d=b.GroupsService.findGroups();d.$loaded().then(function(c){for(var e=0;e<d.length;e++)for(var f=0;f<d[e].members.length;f++)if(console.log("get ImatomoValue.profile"),d[e].members[f].userid===b.ImatomoValue.profile.id){var g={groupid:d[e].$id,groupname:d[e].groupname};a.push(g)}b.groupList=a,b.groupList.groupid=b.groupList[0].groupid});var e=new Date;b.today=e,b.time=(new Date).setHours(e.getHours()+1,0,0,0)},a.prototype.register=function(){console.log("ShitaiController register Method");var a=b.date;if(a.setHours(new Date(b.time).getHours(),new Date(b.time).getMinutes(),59,0),a.getTime()<(new Date).getTime())return b.status="dengire",void(b.message="期限に過去が設定されています。");var c={userid:b.ImatomoValue.profile.id,title:b.title,time:a.getTime(),comment:b.comment?b.comment:"",place:b.place?b.place:"",group:b.groupList.groupid?b.groupList.groupid:""};b.ShitaiesService.addShitai(c,function(){b.$location.path("shitailist")})};var b;a.prototype.closeAlert=function(){console.log("close"),b.status="",b.message=""}}(),function(){"use strict";function a(a,b,c,d,e,f){console.log("ShitaidetailController Constructor"),this.$location=a,this.id=b.id,this.ImatomoValue=c,this.ShitaiesService=d,this.ProfilesService=e,this.GroupsService=f}angular.module("imatomo.components.shitaidetail",["imatomo.service.shitaies","imatomo.service.profiles","imatomo.service.groups"]).controller("ShitaidetailController",a),a.$inject=["$location","$routeParams","ImatomoValue","ShitaiesService","ProfilesService","GroupsService"],a.prototype.activate=function(){console.log("ShitaidetailController activate Method"),b=this,b.ShitaiesService.getShitai(b.id,c)};var b,c=function(a){b.id=a.$id,b.userid=a.userid,b.title=a.title,b.time=a.time,b.place=a.place,b.comment=a.comment,b.createtimesstamp=a.createtimesstamp,b.ProfilesService.getProfile(a.userid,function(a){a&&(b.username=a.username)});var c="みんな",d=b.GroupsService.findGroups();d.$loaded().then(function(e){for(var f=0;f<d.length;f++)if(d[f].$id===a.group){c=d[f].groupname;break}b.group=c}),b.approvals=a.approvals};a.prototype.shitaiDelete=function(){console.log("ShitaidetailController shitaiDelete Method");for(var a=b.ShitaiesService.findShitaies(),c=0;c<a.length;c++)b.id===a[c].$id&&(console.log(a[c]),a.$remove(c));b.$location.path("/shitailist/")},a.prototype.approval=function(a){console.log("ShitaidetailController approval Method"),b.ShitaiesService.approval(a),b.ShitaiesService.getShitai(b.id,c)},a.prototype.cancel=function(a){console.log("ShitaidetailController cancel Method"),b.ShitaiesService.cancel(a),b.ShitaiesService.getShitai(b.id,c)},a.prototype.isApproval=function(a){if(a.userid===b.ImatomoValue.profile.id)return!1;if(!a.approvals)return!0;var c=!0;return a.approvals.forEach(function(a){a.userid===b.ImatomoValue.profile.id&&(c=!1)}),c},a.prototype.isCancel=function(a){if(a.userid===b.ImatomoValue.profile.id)return!1;if(!a.approvals)return!1;var c=!1;return a.approvals.forEach(function(a){a.userid===b.ImatomoValue.profile.id&&(c=!0)}),c}}(),function(){"use strict";function a(a,b,c,d){console.log("ShitailistController Constructor"),this.ShitaiesService=c,this.$location=a,this.ImatomoValue=b,this.GroupsService=d}angular.module("imatomo.components.shitailist",["imatomo.service.shitaies","imatomo.service.groups"]).controller("ShitailistController",a),a.$inject=["$location","ImatomoValue","ShitaiesService","GroupsService"],a.prototype.activate=function(){console.log("ShitailistController activate Method"),b=this;var a=b.GroupsService.findGroups();a.$loaded().then(function(c){b.groupList=a;var d=b.ShitaiesService.findShitaies();b.items=d}),b.filterDate=(new Date).getTime()},a.prototype.searchMyApprovals=function(){console.log("ShitailistController searchMyApprovals Method"),console.log(b.items),console.log(b.items.length);var a=b.items[0].approvals.length;console.log(a);for(var c=0;c<b.items.length;c++){console.log(b.items[c].approvals);for(var d=0;d<b.items[c].approvals.length;d++)return b.items[c].approvals[d].userid===b.ImatomoValue.profile.id?(console.log("b"),console.log(c),console.log(d),console.log(b.items[c].$id),console.log(b.items[c].approvals[d].userid),!0):!1}},a.prototype.approval=function(a){console.log("ShitailistController approval Method"),b.ShitaiesService.approval(a)},a.prototype.cancel=function(a){console.log("ShitailistController approval Method"),b.ShitaiesService.cancel(a)},a.prototype.isApproval=function(a){if(a.userid===b.ImatomoValue.profile.id)return!1;if(!a.approvals)return!0;var c=!0;return a.approvals.forEach(function(a){a.userid===b.ImatomoValue.profile.id&&(c=!1)}),c},a.prototype.isCancel=function(a){if(a.userid===b.ImatomoValue.profile.id)return!1;if(!a.approvals)return!1;var c=!1;return a.approvals.forEach(function(a){a.userid===b.ImatomoValue.profile.id&&(c=!0)}),c},a.prototype.moveDetail=function(a){console.log("ShitailistController moveDetail Method"),b.$location.path("/shitaidetail/"+a)},a.prototype.searchMember=function(a){if(console.log("ShitailistController searchMember Method"),""===a.group)return!0;if(void 0!==b.groupList)return!0;for(var c=0;c<b.groupList.length;c++)if(b.groupList[c].$id===a.group)for(var d=0;d<b.groupList[c].members.length;d++)if(b.groupList[c].members[d].userid===b.ImatomoValue.profile.id)return!0;return!1};var b}(),function(){"use strict";function a(a){return function(b,c,d){a.getProfile(d.userid,function(a){a&&c.append(a.username)})}}angular.module("imatomo.directives.userid",["imatomo.service.profiles"]).directive("userid",a),a.$inject=["ProfilesService"]}(),function(){"use strict";function a(a){a.html5Mode(!1)}angular.module("imatomo.config",[]).config(a),a.$inject=["$locationProvider"]}(),function(){"use strict";angular.module("imatomo.value",[]).value("ImatomoValue",{profile:void 0})}(),function(){"use strict";function a(a,b){var c=new Firebase("https://resplendent-inferno-2076.firebaseio.com/groups"),d=a(c),e={findGroups:function(){return d},getGroup:function(a,b){d.$loaded().then(function(c){b&&b(d.$getRecord(a))})},addGroup:function(a,b){d.$add(a).then(function(){b&&b()})},addMember:function(a){d.$loaded().then(function(c){var e=d.$getRecord(a);e.members||(e.members=[]),e.members.push({userid:b.profile.id,username:b.profile.name}),d.$save(e)})},removeMember:function(a,c,f){d.$loaded().then(function(c){var g=d.$getRecord(a),h=g.members.filter(function(a){return a.userid!==b.profile.id});return 0===h.length?void e.removeGroup(a,f):(g.members=h,d.$save(g),void(f&&f()))})},removeGroup:function(a,b){d.$loaded().then(function(c){var e=d.$getRecord(a);e&&d.$remove(e).then(function(a){b&&b()})})}};return e}angular.module("imatomo.service.groups",["imatomo.service.profiles"]).factory("GroupsService",a),a.$inject=["$firebaseArray","ImatomoValue"]}(),function(){"use strict";function a(a){var b=a("/api/gruntfiles",{query:{transformResponse:function(a){return angular.fromJson(a)}}});return b}angular.module("imatomo.service.gruntfiles",["ngResource"]).factory("GruntfilesService",a),a.$inject=["$resource"]}(),function(){"use strict";function a(a){var b=new Firebase("https://resplendent-inferno-2076.firebaseio.com/profiles"),c=a(b),d={getProfiles:function(){return c},getProfile:function(a,b){c.$loaded().then(function(d){for(var e=0;e<c.length;e++)if(c[e].userid===a){b&&b(c[e]);break}})},modProfile:function(a,b){c.$loaded().then(function(d){for(var e=0;e<c.length;e++){var f=c[e];if(f.userid===a.id)return f.username=a.name,c.$save(f),void(b&&b(f))}var g={userid:a.id,username:a.name};c.$add(g).then(function(a){b&&b(a)})})}};return d}angular.module("imatomo.service.profiles",[]).factory("ProfilesService",a),a.$inject=["$firebaseArray"]}(),function(){"use strict";function a(a,c,d,e){var f=a(b),g={findShitaies:function(){return f},getShitai:function(a,b){f.$loaded().then(function(c){b&&b(f.$getRecord(a))})},addShitai:function(a,b){g.selfApproval=!0,f.$add(a).then(function(a){b&&b()})},approval:function(a){f.$loaded().then(function(b){var d=f.$getRecord(a);d.approvals||(d.approvals=[]),d.approvals.push({userid:c.profile.id}),d.lastApprovalUserid=c.profile.id,f.$save(d)})},cancel:function(a,b){f.$loaded().then(function(d){var e=f.$getRecord(a),g=e.approvals.filter(function(a){return a.userid!==c.profile.id});e.approvals=g,e.lastApprovalUserid="",f.$save(e),b&&b()})}};return Object.defineProperty(g,"selfApproval",{value:!1,writable:!0}),f.$watch(function(a){if(console.log("event.event="+a.event),"child_changed"===a.event){var b=f.$getRecord(a.key);if(g.selfApproval)return console.log("shitaiesService.selfApproval="+g.selfApproval),console.log("自分の $add child_changed だったら何もしない"),void(g.selfApproval=!1);if(console.log("shitai.lastApprovalUserid = "+b.lastApprovalUserid),!b.lastApprovalUserid)return void console.log("賛同する更新じゃなければ無視");if(b.userid!==c.profile.id)return console.log(b.userid+"!=="+c.profile.id),void console.log("自分以外が登録したものなら無視する");var h=b.lastApprovalUserid,i=d.getProfiles();i.$loaded().then(function(a){for(var b=0;b<i.length;b++)if(i[b].userid===h){e.pop("success","仲間があらわれた！",i[b].username+" さんがあなたに賛同しました。");break}}),console.log("仲間があらわれた！！！！！！！！！！！！！！！");var j=new Audio($("base").prop("href")+"audio/linelike.mp3");j.play()}}),g}angular.module("imatomo.service.shitaies",["imatomo.service.profiles"]).factory("ShitaiesService",a),a.$inject=["$firebaseArray","ImatomoValue","ProfilesService","toaster"];var b=new Firebase("https://resplendent-inferno-2076.firebaseio.com/shitaies")}(),function(){"use strict";function a(a,b,c,d,e){this.ImatomoValue=d,a.$on("event:google-plus-signin-success",function(f,g){var h=b("https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token="+g.access_token,{}),i=h.get().$promise;i.then(function(b){if(b.name)e.modProfile(b,function(){d.profile=b});else{c.open({animation:a.animationsEnabled,templateUrl:"myModalContent.html",size:"sm"})}})["catch"](function(a){console.log(a)})}),a.$on("event:google-plus-signin-failure",function(a,b){console.log(b)})}angular.module("imatomo",["ngNewRouter","imatomo.config","imatomo.value","firebase","toaster","ngAnimate","ngResource","ui.bootstrap","directive.g+signin","imatomo.directives.userid","imatomo.components.shitailist","imatomo.components.shitai","imatomo.components.group","imatomo.components.profile","imatomo.components.shitaidetail","imatomo.components.groupdetail","imatomo.service.profiles"]).controller("AppController",a),a.$routeConfig=[{path:"/",redirectTo:"/shitailist"},{path:"/shitailist",component:"shitailist"},{path:"/shitai",component:"shitai"},{path:"/group",component:"group"},{path:"/profile",component:"profile"},{path:"/shitaidetail/:id",component:"shitaidetail"},{path:"/groupdetail/:id",component:"groupdetail"}],a.$inject=["$scope","$resource","$uibModal","ImatomoValue","ProfilesService"]}();