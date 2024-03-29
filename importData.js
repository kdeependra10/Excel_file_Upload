var app = angular.module('app', []);  
      
app.controller('Ctrl', ['$scope', '$http', function ($scope, $http) {  
  
    $scope.selectedFile = null;  
    $scope.msg = "";  
    $scope.IsVisible= false;
  
    $scope.loadFile = function (files) {  
         $scope.$apply(function () {  
             $scope.selectedFile = files[0];  
             })  
        }  
  
        $scope.handleFile = function () {  
        var file = $scope.selectedFile;  
        if (file) {  
        var reader = new FileReader();  
         reader.onload = function (e) {  
                var data = e.target.result;  
                var workbook = XLSX.read(data, { type: 'binary' });  
                var first_sheet_name = workbook.SheetNames[0];  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                console.log(dataObjects);  
  
                if (dataObjects.length > 0) {  
                     //$scope.save(dataObjects); 
                     localStorage.model = JSON.stringify(dataObjects); 
                     } 
                     else {  
                    $scope.msg = "Error : Something Wrong !";  
                     }  
              }  
              reader.onerror = function (ex) {  
              }  
              reader.readAsBinaryString(file);  
        }  
    }  
  
    /* $scope.save = function (data) {  
       
        localStorage.model = JSON.stringify(data);
       $http({  
            method: "POST",  
            url: "http://localhost:3001/UserDetail.json",  
            data: JSON.stringify(data), 
            //data:data, 
            headers: {  
                'Content-Type': 'application/json'  
            }  
  
        }).then(function (data) {  
            if (data.status) {  
                $scope.msg = "Data has been inserted ! ";  
            }  
            else {  
                $scope.msg = "Error : Something Wrong";  
            }  
        }, function (error) {  
            $scope.msg = "Error : Something Wrong";  
        })  
   } */

  $scope.showData =function(){
       $scope.IsVisible= true;
       if (localStorage.model)
       $scope.UserDataFromWeb = JSON.parse(localStorage.model);
       
        /* $http.get("http://localhost:3000/UserDetails")
        .success(function(response) {$scope.UserDataFromWeb = response;});
    */
  }
}]);   