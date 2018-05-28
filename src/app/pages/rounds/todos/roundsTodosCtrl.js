/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rounds')
      .controller('roundsTodosCtrl',['$scope', '$filter','editableOptions','editableThemes', 'roundsFactory','$stateParams','$state', 
        function($scope,$filter,editableOptions,editableThemes,roundsFactory,$stateParams,$state){ 

    $scope.deletarRounds = false;

    $scope.mostraDelecao = function(){
      if($scope.deletarRounds == false)
        $scope.deletarRounds = true;
      else
        $scope.deletarRounds = false;
      }


      
      $scope.removeRounds = function(item){
         roundsFactory.delete({id: item})
         .$promise.then(
            function (response) {
              $state.reload();
            }
          );
     }


    $scope.smartTablePageSize = 10;
 //   $scope.smartTableData = brigadistaFactory.query();
 //   console.log($scope.smartTableData);

      $scope.carregandoRounds = true;

      roundsFactory.query(
          function(response) {
            $scope.smartTableData = response;
            $scope.carregandoRounds = false;
          },
          function(response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );      



        
   // $scope.editableTableData = $scope.smartTableData.slice(0, 36);
  

}])

})();
