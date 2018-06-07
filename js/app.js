let app = angular.module('app', []);

app.controller("mainCtrl", function ($scope) {
    $scope.model = [];
    let inputTask = document.querySelector ('.input [type="text"]');
    let taskText = document.querySelector ('.task_text');
    $scope.edit = false;
    $scope.currIndex;
    $scope.currNumTasks = 0;

    function currTasksNum () {
    	$scope.currNumTasks = 0;
    	$scope.model.forEach( item => {
    		if (!item.compleated) {
    			$scope.currNumTasks++;
    		}
    	})
    }

    $scope.addTask = () => {
    	let textTask = inputTask.value;
    	if (!$scope.edit) {
	    	let item = {};
	    	item.task = textTask;
	    	item.compleated = false;
	    	$scope.model.push(item);
    	} else {
    		$scope.model[$scope.currIndex].task = textTask;
    		$scope.edit = false;
    	}
    	inputTask.value = "";
    	currTasksNum();
    }
    
    $scope.compleateTask = (item, i) => {
    	$scope.currNumTasks = 0;
    	if (item.compleated) {
    		$scope.model[i].compleated = false;
    	} else {
    		$scope.model[i].compleated = true;	
    	}
    	currTasksNum ();
    }

    $scope.editTask = (item, i) => {
    	inputTask.value = item.task;
    	$scope.edit = true;
    	$scope.currIndex = i;
    }

    $scope.clearAll = () => {
    	$scope.model = [];
    	$scope.currNumTasks = 0;
    }

    $scope.clearComp = () => {
    	$scope.model.forEach((item, index) => {
    		if (item.compleated) {
    			$scope.model.splice(index, 1);
    		}
    	})
    	currTasksNum ();
    }

    $scope.deleteTask = (index) => {
    	$scope.model.splice(index, 1);
    	currTasksNum ();
    }
});