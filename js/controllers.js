var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('TaskListController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {
  
 $scope.sortview = "name";
 $scope.vieworder = "1";
 $scope.taskcomplete = "false";

 var skip = 0;
 var limit = 10;
 var listlength;
 $window.sessionStorage.skip = skip;
 $window.sessionStorage.limit = limit;
 $window.sessionStorage.sortview = $scope.sortview;
 $window.sessionStorage.iscomplete = $scope.taskcomplete;
 $window.sessionStorage.vieworder = $scope.vieworder;

 Tasks.get().success(function(listoftasks){
    $scope.tasks = listoftasks.results;
    //$scope.msg = listoftasks.message;
    listlength = listoftasks.results.length;

    console.log(listoftasks);
  });

 $scope.change = function(){
  $window.sessionStorage.sortview = $scope.sortview;
  $window.sessionStorage.iscomplete = $scope.taskcomplete;
  $window.sessionStorage.vieworder = $scope.vieworder;


   Tasks.get().success(function(listoftasks){
      $scope.tasks = listoftasks.results;
      listlength = listoftasks.results.length;

    }).
   error(function(why){
      
      console.log(why);
   });
 }

$(".leftp").css({"visibility":"hidden"});

$scope.removeTask = function(id){
    $window.sessionStorage.taskid = id;
    Tasks.delete().success(function(info){
      $scope.deletemsg = info;
      /* ADDED ON BUS */
          $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/User?where={"pendingTasks":"' + id + '"}',
            headers: {'X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
            }).success(function(a_user){
          if (a_user.results.length != 0){//changed from a_user
          var array = a_user.results[0].pendingTasks;
          var index = array.indexOf(String(edittask_id));
          array.splice(index, 1);
          $http({
            method: 'PUT',
            url: 'https://api.parse.com/1/classes/User/' + a_user.results[0].objectId,
            headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
            
            data: {pendingTasks: array}
          }).success(function(data){
            console.log(data);
            $window.location.reload();

          }).
          error(function(a){
                        $window.location.reload();

          })

          }
          });
      //////////////////
    }).
    error(function(info){
      $scope.deletemsg = info;
                  $window.location.reload();

    });
  };

$scope.pageleft = function(){

   skip -= 10;
   limit -= 10;
  $(".rightp").css({"visibility":"visible"});

  if (skip == 0)
    $(".leftp").css({"visibility":"hidden"});
  else
    $(".leftp").css({"visibility":"visible"});

   $window.sessionStorage.skip = skip;
   $window.sessionStorage.limit = limit;
   Tasks.get().success(function(listoftasks){
        $scope.tasks = listoftasks.results;
      listlength = listoftasks.results.length;

      });
  
};

$scope.pageright = function(){
 skip += 10;
 limit += 10;
 $(".leftp").css({"visibility":"visible"});

 

 $window.sessionStorage.skip = skip;
 $window.sessionStorage.limit = limit;
  Tasks.get().success(function(listoftasks){
   $scope.tasks = listoftasks.results;
      listlength = listoftasks.results.length;
      if (listlength < 10)
          $(".rightp").css({"visibility":"hidden"});
        else 
          $(".rightp").css({"visibility":"visible"});

    });
};
/*
 if ((oldsortview != $scope.sortview) || (oldvieworder != $scope.vieworder) || (oldtaskcomplete != $scope.taskcomplete)){
    Tasks.get().success(function(listoftasks){
      $scope.tasks = listoftasks.data;
      $scope.msg = listoftasks.message;
      oldsortview
    });
    oldsortview = $scope.sortview;
    oldvieworder = $scope.vieworder;
    oldtaskcomplete = $scope.taskcomplete;
 }
*/
/*
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };
*/
}]);
/*
demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);
*/

demoControllers.controller('UserListController', ['$scope', '$http', 'Users', '$window' , function($scope, $http,  Users, $window) {

  Users.get().success(function(listofusers){
    $scope.users = listofusers.results;
    //$scope.msg = listofusers.message;
    console.log(listofusers.results);
  });

  $scope.removeUser = function(id){
    $window.sessionStorage.userid = id;
    Users.delete().success(function(info){
      $scope.deletemsg = info;
      //ADDE DON BUS

      $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/Tasks?where={"assignedUser":"' + id + '"}',
            headers: {'X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
            }).success(function(reassign){
              console.log(reassign);
          if (reassign.results.length != 0){//changed from a_user
              var d = 0;
              for (d = 0 ; d < reassign.results.length; d++){

                $http({
                  method: 'PUT',
                  url: 'https://api.parse.com/1/classes/Tasks/' + reassign.results[d].objectId,
                  headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                  
                  data: {assignedUser: "", assignedUserName: "unassigned"}
                }).success(function(data){
                });




              }
        }
        $window.location.reload();
          
      });

      //////
    }).
    error(function(info){
      $scope.deletemsg = info;
    });
  };

}]);


demoControllers.controller('UserDetailsController', ['$scope', '$routeParams', '$http',  'User', '$window' , function($scope, $routeParams, $http,  User, $window) {
  $window.sessionStorage.user_id = $routeParams.objectId;
  $window.sessionStorage.sel = 0;

  User.get().success(function(user){
    console.log(user);
    $scope.user = user;
    $window.sessionStorage.sel = 1;
    var taskstring = "";
    var i;

    if (user.pendingTasks.length != 0){

      for (i = 0; i < user.pendingTasks.length - 1; i++){
           taskstring = taskstring + '%22' + user.pendingTasks[i] + '%22,';
      }
      taskstring = taskstring + '%22' + user.pendingTasks[user.pendingTasks.length-1] + '%22';
      $window.sessionStorage.task_id = taskstring;
      User.get().success(function(uncompletedtasks){
        console.log(uncompletedtasks);

        $scope.tasks = uncompletedtasks.results;
      }).
      error(function(data){
        console.log(data);
      });
    }
  });

  $scope.taskiscompleted = function(id){
    $window.sessionStorage.donetask_id = id;
    User.put().success(function(info){
      var temp = $window.sessionStorage.sel;
      $window.sessionStorage.sel = 0;
      User.get().success(function(user){
        var taskId = id;
        var array = user.pendingTasks;
        var index = array.indexOf(String(taskId));
        array.splice(index, 1);
        $http({
          method: 'PUT',
          url: 'https://api.parse.com/1/classes/User/' + user.objectId,
          headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
          
          data: {pendingTasks: array}
      }).success(function(data){
        $window.location.reload();
          $window.sessionStorage.sel = temp;

      });

      });

    }).
    error(function(info){
      $scope.deletemsg = info;
    });
  };

  $scope.showcompleted = function(){
    $window.sessionStorage.sel = 2;
    User.get().success(function(info){
      $scope.donetasks = info.results;
    }).
    error(function(info){
      $scope.deletemsg = info;
    });
  };


}]);


demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;
  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);


demoControllers.controller('TaskDetailsController', ['$scope', '$routeParams', '$http', 'Task', '$window' , function($scope, $routeParams, $http,  Task, $window) {

  $window.sessionStorage.task_id = $routeParams.objectId;
  Task.get().success(function(task){
    $scope.task = task;
    //$scope.msg = task;
  });

}]);

demoControllers.controller('EditTaskController', ['$scope', '$routeParams', '$http', 'EditTask', '$window' , function($scope, $routeParams, $http,  EditTask, $window) {

  $window.sessionStorage.edittask_get = 0;
  $window.sessionStorage.edittask_id = $routeParams.objectId;
  var edittask_id;
  EditTask.get().success(function(task){
    console.log(task);
      $window.sessionStorage.edittask_get = 1;

    $scope.edittask_name = task.name;
    $scope.edittask_description = task.description;
    $scope.edittask_deadline = task.deadline;
    $scope.edittask_assigneduser = task.assignedUser;
    $scope.edittask_completed = task.completed;
    edittask_id = task.objectId;


     EditTask.get().success(function(listofusers){
      $scope.users = listofusers.results;
 
    });

  });

  


 $scope.submitedittask = function(id){
    $window.sessionStorage.edittask_name = $scope.edittask_name;
    $window.sessionStorage.edittask_description = $scope.edittask_description;
    $window.sessionStorage.edittask_deadline = $scope.edittask_deadline;
    $window.sessionStorage.edittask_completed = $scope.edittask_completed;
    $window.sessionStorage.edittask_assigneduser = $scope.edittask_assigneduser;
    $http.get('https://api.parse.com/1/classes/User/'+$scope.edittask_assigneduser).success(function(data){
        $window.sessionStorage.edittask_assignedusername = data.name;
      EditTask.put().success(function(edittask){
        $scope.msg = edittask;
              $window.sessionStorage.edittask_get = 2;

        if ($window.sessionStorage.edittask_completed == "true"){
           $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/User?where={"pendingTasks":"' + edittask_id + '"}',
            headers: {'X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
            }).success(function(a_user){
          if (a_user){
          var array = a_user.results[0].pendingTasks;
          var index = array.indexOf(String(edittask_id));
          array.splice(index, 1);
          $http({
            method: 'PUT',
            url: 'https://api.parse.com/1/classes/User/' + a_user.results[0].objectId,
            headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
            
            data: {pendingTasks: array}
          }).success(function(data){
            console.log(data);
          });


            }
          });

        }
        else {
          console.log("am i here");
          $http.get('https://api.parse.com/1/classes/User/'+$scope.edittask_assigneduser).success(function(a_user){
              var array = a_user.pendingTasks;
              array.push(edittask_id);
               $http({
            method: 'PUT',
            url: 'https://api.parse.com/1/classes/User/' + a_user.objectId,
            headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
            
            data: {pendingTasks: array}
      }).success(function(data){
          console.log(data);
      });
          });

        }
      }).
      error(function(d){
        console.log(d);
      });
  });
 };
/*
  $window.sessionStorage.task_id = $routeParams._id
  Task.get().success(function(task){
    $scope.task = task.data;
    $scope.msg = task.message;
  });
*/
}]);

demoControllers.controller('AddUserListController', ['$scope', '$http', 'Users', '$window' , function($scope, $http,  Users, $window) {

  $scope.newuser_name = "";
  $scope.newuser_email = "";
 
 $scope.submitnewuser = function(){
      $window.sessionStorage.username = $scope.newuser_name;
      $window.sessionStorage.useremail = $scope.newuser_email;

     Users.post().success(function(info){
        $scope.msg = info;
            console.log(info);

      }).
     error(function(info){
        $scope.msg = info;
            console.log(info);

      });
  };

}]);


demoControllers.controller('AddTaskListController', ['$scope', '$http', 'AddTask', '$window' , function($scope, $http,  AddTask, $window) {

  $scope.newtask_name = "";
  $scope.newtask_description = "";
  $scope.newtask_deadline = "";
  $scope.newtask_assigneduser = "";

 AddTask.get().success(function(listofusers){
    $scope.users = listofusers.results;
    console.log(listofusers);
  });

 $scope.submitnewtask = function(){

    $window.sessionStorage.taskname = $scope.newtask_name;
    $window.sessionStorage.taskdescription = $scope.newtask_description;
    $window.sessionStorage.taskdeadline = $scope.newtask_deadline;
    $window.sessionStorage.assigneduser = $scope.newtask_assigneduser;
    var pendinglist = [];
    //alert($scope.newtask_deadline);
    $http.get('https://api.parse.com/1/classes/User/'+$scope.newtask_assigneduser).success(function(data){
        $window.sessionStorage.assignedusername = data.name;
         //if (!data.pendingTasks)
           //pendinglist = data.pendingTasks;
          AddTask.post().success(function(info){
          $scope.msg = info;
        //  pendinglist.push(info.objectId);
            console.log(info);
         
            $http.get('https://api.parse.com/1/classes/Tasks?where={"assignedUser":"' + $scope.newtask_assigneduser + '" ,"completed":false}').success(function(data){
                var i;
                console.log(data);
                for (i = 0; i < data.results.length; i++){
                  var item = String(data.results[i].objectId);
                  pendinglist.push(item);
                }
                console.log(pendinglist);
                $http({
                    method: 'PUT',
                    url: 'https://api.parse.com/1/classes/User/'+$scope.newtask_assigneduser,
                    headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                   
                    data: {pendingTasks: pendinglist}
                }).success(function(data){
                  console.log(data);
                }).
                error(function(a){
                  console.log(a);
                })
            }).
            error(function(b){
                console.log(b);
            });
         /*   $http({
                    method: 'PUT',
                    url: 'https://api.parse.com/1/classes/User/'+$scope.newtask_assigneduser,
                    headers: {'Content-Type': 'application/json','X-Parse-Application-Id': 'CcU0fIKbHlD3Ae45oW7K7RPQmnaSfBudv867S4C2', 'X-Parse-REST-API-Key': 'MWU0RvWi8otDyv0gzXSRzd6a9ckuteuLweOdmJfv'},
                      
                    data: {pendingTasks: "[323]"}
                }).success(function(data){
                  console.log(data);
                });
*/
        }).
        error(function(info){
            $scope.msg = info;
            console.log(info);
        });
        });
  
 };





/*
 $scope.submitnewuser = function(){
      $window.sessionStorage.username = $scope.newuser_name;
      $window.sessionStorage.useremail = $scope.newuser_email;

     Users.post().success(function(info){
        $scope.msg = info.message;
            console.log(info);

      }).
     error(function(info){
        $scope.msg = info.message;
            console.log(info);

      });
  };
*/
}]);

