var app = angular.module('app',[]);
app.directive('compare',function(){
    return {
        require: 'ngModel',
        link: function(scope,ele,attrs,ctrl){
            var flag = false;
            scope.$watch("password",function(scope,ele,attrs,ctrl){
                var password2 = attrs.myForm.password2.$viewValue;
                if(scope != password2) {
                    flag = true;
                }else{
                    flag = false;
                }
                attrs.myForm.password2.$invalid = flag;
            })
            scope.$watch("password2",function(scope,ele,attrs,ctrl){
                var password = attrs.myForm.password.$viewValue;
                if(scope != password) {
                    flag = true;
                }else{
                    flag = false;
                }
                attrs.myForm.password2.$invalid = flag;
            })
        }
    }
})

app.controller('formController',['$scope',function($scope){
    $scope.submit = function(){
        alert("提交成功");
    }
}])