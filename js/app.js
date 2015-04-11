// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices','720kb.datepicker']);


demoApp.run(function($http) {
  $http.defaults.headers.common['X-Parse-Application-Id']= 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2'; 
  $http.defaults.headers.common['X-Parse-REST-API-Key']= 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv';
});

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/tasklist', {
    templateUrl: 'partials/parse/tasklist.html',
    controller: 'TaskListController'
  }).
  when('/addtask', {
    templateUrl: 'partials/parse/addtask.html',
    controller: 'AddTaskListController'
  }).
  when('/edittask/:objectId', {
    templateUrl: 'partials/parse/edittask.html',
    controller: 'EditTaskController'
  }).
 when('/tasklist/:objectId', {
    templateUrl: 'partials/parse/taskdetails.html',
    controller: 'TaskDetailsController'
  }).
  when('/settings', {
    templateUrl: 'partials/parse/settings.html',
    controller: 'SettingsController'
  }).
  when('/userlist', {
    templateUrl: 'partials/parse/userlist.html',
    controller: 'UserListController'
  }).
  when('/adduser', {
    templateUrl: 'partials/parse/adduser.html',
    controller: 'AddUserListController'
  }).
  when('/userlist/:objectId', {
    templateUrl: 'partials/parse/userdetails.html',
    controller: 'UserDetailsController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);

