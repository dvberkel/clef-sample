;(function(angular, undefined){
    function value(v){
        return {
            orDefault: function(defaultValue){
                return (v === undefined || v === null) ? defaultValue : v;
            }
        }
    }

    function User(data){
        data = data || {};
        this.name    = value(data.first_name)  .orDefault('-');
        this.surname = value(data.last_name)   .orDefault('-');
        this.email   = value(data.email)       .orDefault('-');
        this.phone   = value(data.phone_number).orDefault('-');
    }

    angular.module('clefApp', [])
        .controller('UserController', function($scope, $http){
            $scope.user = new User();
            $http.get('/user').then(function(response){
                $scope.user = new User(response.data);
            }, function(response){
                $scope.user = new User();
            });

        })
        .directive('info', function(){
            return {
                restrict: 'E',
                templateUrl: 'user-info.html',
                scope: {
                    'user': '=user'
                }
            }
        });
})(angular);
