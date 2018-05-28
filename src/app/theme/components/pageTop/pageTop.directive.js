/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')

  .controller('homeController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory){

        $scope.loggedIn = false;
        $scope.username = '';
        
        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }
            
        $rootScope.openLogin = function () {
            ngDialog.open({ 
              template: 'app/pages/login/login.html', 
              scope: $scope, 
              className: 'ngdialog-theme-default', 
              controller:"LoginController" 
            });
        };

        $rootScope.openRegister = function () {
          console.log("oi");
          ngDialog.open({ 
            template: 'app/pages/register/register.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller: "RegisterController" 
          });
      };
        
        $scope.logOut = function() {
           AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
        };
        
        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });
            
        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });
        
        $scope.stateis = function(curstate) {
           return $state.is(curstate);  
        };
      
      }]) 

    .controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory','$state', '$rootScope', 
      function ($scope, ngDialog, $localStorage, AuthFactory,$state, $rootScope) {
      

       $scope.loginData = $localStorage.getObject('userinfo','{}');
      
      $scope.doLogin = function() {
          if($scope.rememberMe)
             $localStorage.storeObject('userinfo',$scope.loginData);

          AuthFactory.login($scope.loginData);

          
          ngDialog.close();

      }
  	}])

    .controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', 
      function ($scope, ngDialog, $localStorage, AuthFactory) {
      
      $scope.register={};
      $scope.loginData={};
      
      $scope.doRegister = function() {
          console.log('Doing registration', $scope.registration);

          AuthFactory.register($scope.registration);
          
          ngDialog.close();

      };
      
  }])
              
      
      
 


      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      controller: 'homeController'
    };
  }

})();