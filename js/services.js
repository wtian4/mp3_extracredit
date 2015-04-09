// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Tasks', function($http, $window) {  
        return {
            get: function() {
                 var baseUrl = $window.sessionStorage.baseurl;
                 var sortelement = $window.sessionStorage.sortview;
                 var taskcomplete = $window.sessionStorage.iscomplete;
                 var vieworder = $window.sessionStorage.vieworder;
                 var taskskip = "skip=" + $window.sessionStorage.skip + "&";
                 var tasklimit = "limit=" + $window.sessionStorage.limit;
                 var where_str;
                 if (taskcomplete == "all")
                    where_str = "";
                 else
                    where_str = "where={%22completed%22:" + taskcomplete + "}&";

                 sort_str = "sort={%22" + sortelement + "%22:" + vieworder + "}&";
                 return $http.get(baseUrl+'/api/tasks?' + where_str + sort_str + taskskip + tasklimit);
            },
            delete : function(){
                var baseUrl = $window.sessionStorage.baseurl;
                var taskid = $window.sessionStorage.taskid;
                return $http.delete(baseUrl+'/api/tasks/'+taskid);
            }
        }    
    })
    .factory('Task', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var task_id = $window.sessionStorage.task_id;
                return $http.get(baseUrl+'/api/tasks/' + task_id);

            }
        }
    })
    .factory('EditTask', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var edittask_id = $window.sessionStorage.edittask_id;

                if ($window.sessionStorage.edittask_get == 0)
                    return $http.get(baseUrl+'/api/tasks/' + edittask_id);
                else
                    return $http.get(baseUrl+'/api/users');
            },
            put: function(){
                var baseUrl = $window.sessionStorage.baseurl;
                var edittask_id = $window.sessionStorage.edittask_id;
                var edittask_name = $window.sessionStorage.edittask_name;
                var edittask_desc = $window.sessionStorage.edittask_description;
                var edittask_deadline = $window.sessionStorage.edittask_deadline;
                var edittask_completed = $window.sessionStorage.edittask_completed;
                var edittask_assigneduser = $window.sessionStorage.edittask_assigneduser;
                return $http({
                    method: 'PUT',
                    url: baseUrl+'/api/tasks/' + edittask_id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {name: edittask_name, description: edittask_desc, deadline: edittask_deadline, completed: edittask_completed, assignedUser: edittask_assigneduser}
                });                
            }
        }
    })
    .factory('Users', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users');
            },
            post : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var username = $window.sessionStorage.username;
                var useremail = $window.sessionStorage.useremail;
                return $http({
                    method: 'POST',
                    url: baseUrl+'/api/users',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {name: username, email: useremail}
                });
            },
            delete : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var userid = $window.sessionStorage.userid;
                return $http.delete(baseUrl+'/api/users/'+userid);
            },
        }
    })
    .factory('User', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var user_id = $window.sessionStorage.user_id;
                var task_id = "?where={%22_id%22:{%22$in%22:[" + $window.sessionStorage.task_id + "]}}";
                var getcompleted = "?where={\"completed\":true,\"assignedUser\":\"" + user_id + "\"}";

                if ($window.sessionStorage.sel == 0)
                    return $http.get(baseUrl+'/api/users/' + user_id);
                else if ($window.sessionStorage.sel == 1)
                    return $http.get(baseUrl+'/api/tasks' + task_id);
                else
                    return $http.get(baseUrl+'/api/tasks' + getcompleted);

            },
            put : function(){
                var baseUrl = $window.sessionStorage.baseurl;
                var donetask_id = $window.sessionStorage.donetask_id;

                return $http({
                    method: 'PUT',
                    url: baseUrl+'/api/tasks/' + donetask_id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {completed: true}
                });                
            }
        }
    })
     .factory('AddTask', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users');
            },
            post : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var taskname = $window.sessionStorage.taskname;
                var taskdesc = $window.sessionStorage.taskdescription;
                var taskdeadline = $window.sessionStorage.taskdeadline;
                var taskassigneduser = $window.sessionStorage.assigneduser;
                return $http({
                    method: 'POST',
                    url: baseUrl+'/api/tasks',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {name: taskname, description: taskdesc, deadline: taskdeadline, assignedUser: taskassigneduser}
                });
            }
        }
    });
