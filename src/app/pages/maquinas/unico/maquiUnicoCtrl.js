/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.maquinas')
    .controller('maquiUnicoCtrl', ['$scope','maquinaFactory', '$state','$stateParams', 
      function($scope, maquinaFactory,$state,$stateParams){
      
      $scope.editar = true;

      $scope.gonnaEdit = function()
      {
        $scope.editar = false;
      }

      $scope.carregado = false;

      maquinaFactory.get({id: $stateParams.id})
        .$promise.then(
            function (response) {
              $scope.maqui = response;
              console.log(response);
                           
              // for(int i=0; i<response.dt.length; i++){
              //   div[i]
              // }
              var ano = response.dt[0] + response.dt[1] + response.dt[2] + response.dt[3]
              var mes = response.dt[5] + response.dt[6]
              var dia = response.dt[8] + response.dt[9]
             
              $scope.dt = $scope.setDate("1999", "05", "31");
              $scope.carregado = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.saveChanges = function()
        {
            maquinaFactory.update({id: $stateParams.id},$scope.maqui);
            $scope.editar = true;                        
        }

         $scope.discardChanges =  function()
         {
              maquinaFactory.get({id: $stateParams.id})
              .$promise.then(
              function (response) {
                $scope.maqui = response;
                console.log(response);
                $scope.carregado = true;
              },
              function (response) {
                  $scope.message = "Error: " + response.status + " " + response.statusText;
              }
          );
              $scope.editar = true;

         }

 
////////////////////////////////COMECA DATA//////////////////////////////////////////

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };


  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };


  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };


  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.popup1 = {
    opened: false
  };




  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
    console.log(dt);
  }

//////////////////////////////////////////ACABOU DATA////////////////////////////////////


  }])
    
})();


