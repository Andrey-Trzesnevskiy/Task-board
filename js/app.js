let app = angular.module('app', []);

app.controller("mainCtrl", function ($scope) {
	let model = JSON.parse(localStorage.getItem("model"));
    $scope.model = model || [];
    let inputTask = document.querySelector ('.input [type="text"]');
    let taskText = document.querySelector ('.task_text');
    let addTaskBtn = document.querySelector ('.add_task');
    
    $scope.edit = false;
    $scope.currIndex;
    $scope.currNumTasks = currTasksNum ();

    function currTasksNum () {
    	$scope.currNumTasks = 0;
    	$scope.model.forEach( item => {
    		if (!item.compleated) {
    			$scope.currNumTasks++;
    		}
    	})
    	return $scope.currNumTasks
    }

    function setDataToLocSt () {
    	let modelJson = JSON.stringify($scope.model);
    	localStorage.setItem("model", modelJson);
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
    	setDataToLocSt();
    }

    $scope.addTaskEnter = event => {
    	if (event.charCode == 13) $scope.addTask();
    }
    
    $scope.compleateTask = (item, i) => {
    	$scope.currNumTasks = 0;
    	if (item.compleated) {
    		$scope.model[i].compleated = false;
    	} else {
    		$scope.model[i].compleated = true;	
    	}
    	currTasksNum ();
    	setDataToLocSt ();
    }

    $scope.editTask = (item, i) => {
    	inputTask.value = item.task;
    	$scope.edit = true;
    	$scope.currIndex = i;
    	setDataToLocSt ();
    }

    $scope.clearAll = () => {
    	$scope.model = [];
    	$scope.currNumTasks = 0;
    	setDataToLocSt ();
    }

    $scope.clearComp = () => {
    	$scope.model = $scope.model.filter(item => {
    		return !item.compleated
    	})
    	currTasksNum ();
    	setDataToLocSt ();
    }

    $scope.deleteTask = (index) => {
    	$scope.model.splice(index, 1);
    	currTasksNum ();
    	setDataToLocSt ();
    	$scope.edit = false;
    }
});

app.directive("dragndrop", function () {
    return {
        restrict: "A",
        scope: {
            data: '=?dragndrop'
        },
        link: function ($scope, $element, attrs) {
            let ctrl = this;
            let isDragged;

            ctrl.init = _onInit;
            ctrl.onDragStart = onDragStart;
            ctrl.onDrag = onDrag;
            ctrl.onDragEnd = onDragEnd;
            ctrl.onDrop = onDrop;

            $element.on('dragstart', ctrl.onDragStart);
            $element.on('drag', ctrl.onDrag);
            $element.on('dragend', ctrl.onDragEnd);
            $element.on('dragover drop', ctrl.onDrop);

            function _onInit() {
                isDragged = false;
                $scope.data = $scope.data || {};
            }

            function onDragStart(event) {
                if (isDragged) {
                    return;
                }

                isDragged = true;
                dragedIndex = $scope.data.index;
                $scope.$apply();
                $element[0].classList.toggle("draged");
                $element[0].classList.toggle("task-color");
            }

            function onDrag(event) {

            }

            function onDragEnd(event) {
                isDragged = false;
                $element[0].classList.toggle("draged");
                $element[0].classList.toggle("task-color");
                let modelJson = JSON.stringify($scope.data.model);
    			localStorage.setItem("model", modelJson);
            }

            function onDrop(event) {
                event.preventDefault();
                if (event.type != 'drop') {
                    return;
                }

                isDragged = false;
                dropedIndex = $scope.data.index;
                dropHandler();
                $scope.$apply();
            }

            function dropHandler () {
            	if (dropedIndex == dragedIndex) return;
            	let temp = $scope.data.model[dragedIndex];
            	$scope.data.model.splice(dragedIndex, 1);
            	$scope.data.model.splice(dropedIndex, 0, temp);
            }

            ctrl.init();
        }
    }
});