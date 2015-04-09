// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices','720kb.datepicker']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/tasklist', {
    templateUrl: 'partials/tasklist.html',
    controller: 'TaskListController'
  }).
  when('/addtask', {
    templateUrl: 'partials/addtask.html',
    controller: 'AddTaskListController'
  }).
  when('/edittask/:_id', {
    templateUrl: 'partials/edittask.html',
    controller: 'EditTaskController'
  }).
 when('/tasklist/:_id', {
    templateUrl: 'partials/taskdetails.html',
    controller: 'TaskDetailsController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/userlist', {
    templateUrl: 'partials/userlist.html',
    controller: 'UserListController'
  }).
  when('/adduser', {
    templateUrl: 'partials/adduser.html',
    controller: 'AddUserListController'
  }).
  when('/userlist/:_id', {
    templateUrl: 'partials/userdetails.html',
    controller: 'UserDetailsController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);