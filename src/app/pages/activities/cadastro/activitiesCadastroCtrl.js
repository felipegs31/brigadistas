 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.activities')  
    .controller('activitiesCadastroCtrl', ['$scope','activitiesFactory', '$state','ngDialog','$rootScope', 
      function($scope, activitiesFactory,$state,ngDialog,$rootScope){


  $scope.input = new activitiesFactory();  //create new movie instance. Properties will be set via ng-model on UI
  $scope.evento = "a atividade"

  $scope.addActivities = function() { //create a new movie. Issues a POST to /api/movies
    $scope.input.$save(function() {
      $scope.nomeDoEvento = $scope.input.name;
      ngDialog.open({ 
            template: 'app/pages/confirmacoes/confirmacoes.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"activitiesCadastroCtrl"
          });  
    });
    //console.log($scope.input);
  };

  $rootScope.$on('ngDialog.closed', function (e, $dialog) {
    $state.reload();
  });

    }])

})();


