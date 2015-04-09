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
    $scope.tasks = listoftasks.data;
    $scope.msg = listoftasks.message;
    listlength = listoftasks.data.length;

    console.log(listoftasks);
  });

 $scope.change = function(){
  $window.sessionStorage.sortview = $scope.sortview;
  $window.sessionStorage.iscomplete = $scope.taskcomplete;
  $window.sessionStorage.vieworder = $scope.vieworder;


   Tasks.get().success(function(listoftasks){
      $scope.tasks = listoftasks.data;
      $scope.msg = listoftasks.message;
      listlength = listoftasks.data.length;

    }).
   error(function(why){
      
      console.log(why);
   });
 }

$(".leftp").css({"visibility":"hidden"});

$scope.removeTask = function(id){
    $window.sessionStorage.taskid = id;
    Tasks.delete().success(function(info){
      $scope.deletemsg = info.message;
      $window.location.reload();
    }).
    error(function(info){
      $scope.deletemsg = info.message;
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
        $scope.tasks = listoftasks.data;
        $scope.msg = listoftasks.message;
      listlength = listoftasks.data.length;

      });
  
};

$scope.pageright = function(){
 skip += 10;
 limit += 10;
 $(".leftp").css({"visibility":"visible"});

 

 $window.sessionStorage.skip = skip;
 $window.sessionStorage.limit = limit;
  Tasks.get().success(function(listoftasks){
      $scope.tasks = listoftasks.data;
      $scope.msg = listoftasks.message;
      listlength = listoftasks.data.length;
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
    $scope.users = listofusers.data;
    $scope.msg = listofusers.message;
    console.log(listofusers);
  });

  $scope.removeUser = function(id){
    $window.sessionStorage.userid = id;
    Users.delete().success(function(info){
      $scope.deletemsg = info.message;
      $window.location.reload();
    }).
    error(function(info){
      $scope.deletemsg = info.message;
    });
  };

}]);


demoControllers.controller('UserDetailsController', ['$scope', '$routeParams', '$http',  'User', '$window' , function($scope, $routeParams, $http,  User, $window) {
  $window.sessionStorage.user_id = $routeParams._id
  $window.sessionStorage.sel = 0;

  User.get().success(function(user){
    $scope.user = user.data;
    $scope.msg = user.message;
    $window.sessionStorage.sel = 1;
    var taskstring = "";
    var i;

    if (user.data.pendingTasks.length != 0){

      for (i = 0; i < user.data.pendingTasks.length - 1; i++){
           taskstring = taskstring + '%22' + user.data.pendingTasks[i] + '%22,';
      }
      taskstring = taskstring + '%22' + user.data.pendingTasks[user.data.pendingTasks.length-1] + '%22';
      $window.sessionStorage.task_id = taskstring;
      User.get().success(function(uncompletedtasks){
        $scope.tasks = uncompletedtasks.data;
      });
    }
  });

  $scope.taskiscompleted = function(id){
    $window.sessionStorage.donetask_id = id;
    User.put().success(function(info){

      $window.location.reload();
    }).
    error(function(info){
      $scope.deletemsg = info.message;
    });
  };

  $scope.showcompleted = function(){
    $window.sessionStorage.sel = 2;
    User.get().success(function(info){
      $scope.donetasks = info.data;
    }).
    error(function(info){
      $scope.deletemsg = info.message;
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

  $window.sessionStorage.task_id = $routeParams._id
  Task.get().success(function(task){
    $scope.task = task.data;
    $scope.msg = task.message;
  });

}]);

demoControllers.controller('EditTaskController', ['$scope', '$routeParams', '$http', 'EditTask', '$window' , function($scope, $routeParams, $http,  EditTask, $window) {

  $window.sessionStorage.edittask_get = 0;
  $window.sessionStorage.edittask_id = $routeParams._id;

  EditTask.get().success(function(task){
    $scope.edittask_name = task.data.name;
    $scope.edittask_description = task.data.description;
    $scope.edittask_deadline = task.data.deadline;
    $scope.edittask_assigneduser = task.data.assignedUser;
    $scope.edittask_completed = task.data.completed;
    $window.sessionStorage.edittask_get = 1;
     EditTask.get().success(function(listofusers){
      $scope.users = listofusers.data;
 
    });

  });

  


 $scope.submitedittask = function(id){
    $window.sessionStorage.edittask_name = $scope.edittask_name;
    $window.sessionStorage.edittask_description = $scope.edittask_description;
    $window.sessionStorage.edittask_deadline = $scope.edittask_deadline;
    $window.sessionStorage.edittask_completed = $scope.edittask_completed;
    $window.sessionStorage.edittask_assigneduser = $scope.edittask_assigneduser;
    EditTask.put().success(function(edittask){
      $scope.msg = edittask.message;

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
        $scope.msg = info.message;
            console.log(info);

      }).
     error(function(info){
        $scope.msg = info.message;
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
    $scope.users = listofusers.data;
    console.log(listofusers);
  });

 $scope.submitnewtask = function(){

    $window.sessionStorage.taskname = $scope.newtask_name;
    $window.sessionStorage.taskdescription = $scope.newtask_description;
    $window.sessionStorage.taskdeadline = $scope.newtask_deadline;
    $window.sessionStorage.assigneduser = $scope.newtask_assigneduser;
    AddTask.post().success(function(info){
        $scope.msg = info.message
        console.log(info);
    }).
    error(function(info){
        $scope.msg = info.message;
        console.log(info);
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

