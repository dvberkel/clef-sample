;(function(angular, undefined){
    function value(v){
        return {
            orDefault: function(defaultValue){
                return (v === undefined || v === null) ? defaultValue : v;
            }
        }
    }

    function User(name, surname, email, phone){
        this.name    = value(name)   .orDefault('-');
        this.surname = value(surname).orDefault('-');
        this.email   = value(email)  .orDefault('-');
        this.phone   = value(phone)  .orDefault('-');
    }

    angular.module('clefApp', [])
        .controller('UserController', function($scope){
            $scope.user = new User();
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
