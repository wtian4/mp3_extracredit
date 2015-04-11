// js/services/todos.js
angular.module('demoServices', [])
/*
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
*/
    .factory('Tasks', function($http, $window) {  
        return {
            get: function() {

                 var sortelement = $window.sessionStorage.sortview;
                 var taskcomplete = $window.sessionStorage.iscomplete;
                 var vieworder = $window.sessionStorage.vieworder;
                 
                 var taskskip = "&skip=" + $window.sessionStorage.skip + "&";
                 var tasklimit = "limit=" + $window.sessionStorage.limit;
                 
                 var where_str;
                 if (taskcomplete == "all")
                    where_str = "";
                 else
                    where_str = "where={%22completed%22:" + taskcomplete + "}&";

                 if (vieworder == '1')
                    desc = "";
                 else
                    desc = "-";

                 sort_str = "order=" +desc + sortelement;
                 //alert(sort_str)
/*                 sort_str = "order={%22" + sortelement + "%22:" + vieworder + "}&";
                 */

                return $http({
                    method: 'GET',
                    url: 'https://api.parse.com/1/classes/Tasks?' + where_str + sort_str + taskskip + tasklimit,
                    headers: {'X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'}
                });
                //return $http.get('https://api.parse.com/1/classes/Tasks/' + where_str + sort_str + taskskip + tasklimit);
            },
            delete : function(){
                var taskid = $window.sessionStorage.taskid;
                return $http.delete('https://api.parse.com/1/classes/Tasks/'+taskid);
            }
        }    
    })

    .factory('Task', function($http, $window) {      
        return {
            get : function() {
                var task_id = $window.sessionStorage.task_id;
                return $http.get('https://api.parse.com/1/classes/Tasks/' + task_id);

            }
        }
    })
    .factory('EditTask', function($http, $window) {      
        return {
            get : function() {
                var edittask_id = $window.sessionStorage.edittask_id;

                if ($window.sessionStorage.edittask_get == 0)
                    return $http.get('https://api.parse.com/1/classes/Tasks/' + edittask_id);
                else if ($window.sessionStorage.edittask_get == 1)

                    return $http.get('https://api.parse.com/1/classes/User');
  
            },
            put: function(){
                var edittask_id = $window.sessionStorage.edittask_id;
                var edittask_name = $window.sessionStorage.edittask_name;
                var edittask_desc = $window.sessionStorage.edittask_description;
                var edittask_deadline = $window.sessionStorage.edittask_deadline;
                var edittask_completed = $window.sessionStorage.edittask_completed;
                var edittask_assignedusername = $window.sessionStorage.edittask_assignedusername;
                var boolcomp;
                if (edittask_completed == "false")
                    boolcomp = false;
                else
                    boolcomp = true;
                var edittask_assigneduser = $window.sessionStorage.edittask_assigneduser;
                return $http({
                    method: 'PUT',
                    url: 'https://api.parse.com/1/classes/Tasks/'+edittask_id,
                    headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                  
                    data: {name: edittask_name, description: edittask_desc, deadline: edittask_deadline, assignedUser: edittask_assigneduser, completed: boolcomp, assignedUserName: edittask_assignedusername}
                });                
            }
        }
    })

    .factory('Users', function($http, $window) {      
        return {
            get : function() {
                return $http({
                    method: 'GET',
                    url: 'https://api.parse.com/1/classes/User',
                    headers: {'X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'}
                });
            },
            post : function() {
                var username = $window.sessionStorage.username;
                var useremail = $window.sessionStorage.useremail;
                var empty = [];
                return $http({
                    method: 'POST',
                    url: 'https://api.parse.com/1/classes/User',
                    headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                    
                    data: {name: username, email: useremail, pendingTasks: empty}
                });
            },
            delete : function() {
                var userid = $window.sessionStorage.userid;
                return $http.delete('https://api.parse.com/1/classes/User/'+userid);
            },
        }
    })

    .factory('User', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                var user_id = $window.sessionStorage.user_id;
                var task_id = "?where={%22objectId%22:{%22$in%22:[" + $window.sessionStorage.task_id + "]}}";
                var getcompleted = "?where={\"completed\":true,\"assignedUser\":\"" + user_id + "\"}";

                if ($window.sessionStorage.sel == 0)
                    return $http.get('https://api.parse.com/1/classes/User/' + user_id);
                else if ($window.sessionStorage.sel == 1)
                    return $http.get('https://api.parse.com/1/classes/Tasks' + task_id);
                else
                    return $http.get('https://api.parse.com/1/classes/Tasks' + getcompleted);

            },
            put : function(){
                var donetask_id = $window.sessionStorage.donetask_id;
                return $http({
                    method: 'PUT',
                    url: 'https://api.parse.com/1/classes/Tasks/' + donetask_id,
                    headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                    
                    data: {completed: true}
                });                
            }
        }
    })

     .factory('AddTask', function($http, $window) {      
        return {
            get : function() {
                return $http.get('https://api.parse.com/1/classes/User');
            },
            post : function() {
                var taskname = $window.sessionStorage.taskname;
                var taskdesc = $window.sessionStorage.taskdescription;
                var taskdeadline = $window.sessionStorage.taskdeadline;
                var taskassigneduser = $window.sessionStorage.assigneduser;
                var taskassignedusername = $window.sessionStorage.assignedusername;
                 return $http({
                    method: 'POST',
                    url: 'https://api.parse.com/1/classes/Tasks',
                    headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                  
                    data: {name: taskname, description: taskdesc, deadline: taskdeadline, assignedUser: taskassigneduser, completed: false, assignedUserName: taskassignedusername}
                });
            }
        }
    });
