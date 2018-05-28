 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rounds')  
    .controller('roundsCadastroCtrl', ['$scope','roundsFactory', '$state','sitesFactory','ngDialog','$rootScope', 'comunitiesFactory',
     function($scope, roundsFactory,$state, sitesFactory,ngDialog,$rootScope,comunitiesFactory){


  $scope.input = new roundsFactory();  //create new movie instance. Properties will be set via ng-model on UI
   $scope.evento = "o round"

  $scope.addRound = function() { //create a new movie. Issues a POST to /api/movies

    if(!$scope.input.hasOwnProperty("begin")){
      $scope.warning = "Insira uma data de início";
      return;
    }else if(!$scope.input.hasOwnProperty("end")){
      $scope.warning = "Insira uma data de término";
      return;
    }else if($scope.input.begin > $scope.input.end){
      $scope.warning = "A data de término deve ser posterior a de início";
      return;
    }

    $scope.input.$save(function() {
      $scope.nomeDoEvento = $scope.input.name;
      ngDialog.open({ 
            template: 'app/pages/confirmacoes/confirmacoes.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"roundsCadastroCtrl"
          });  
    });
    console.log($scope.input);
  };

  $rootScope.$on('ngDialog.closed', function (e, $dialog) {
    $state.reload();
  });
  
   $scope.fillingSites = [];
   sitesFactory.query(
      function(response) {
        $scope.dadoSite = response;
        
        for (var i=0; i<response.length; i++){
          $scope.fillingSites[i] = response[i].name
       
        }
       
        comunitiesFactory.query(
          function(resposta) {
            for (var i=0; i<resposta.length; i++){
              $scope.fillingSites.push(resposta[i].name);
            }
           
          },
          function(resposta) {
              $scope.message = "Error: " + resposta.status + " " + resposta.statusText;
          }
        );  

        $scope.fillingSites.push('Todos');
        console.log($scope.fillingSites);
      },
      function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );      


   

   ////////////////////////////////COMECA DATA 1//////////////////////////////////////////

  $scope.today1 = function() {
    $scope.begin = new Date();
  };
  $scope.today1();

  $scope.clear1 = function() {
    $scope.begin = null;
  };

  $scope.inlineOptions1 = {
   // customClass: getDayClass1,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions1 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };


  $scope.toggleMin1 = function() {
    $scope.inlineOptions1.minDate = $scope.inlineOptions1.minDate ? null : new Date();
    $scope.dateOptions1.minDate = $scope.inlineOptions1.minDate;
  };

  $scope.toggleMin1();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };


  $scope.setDate1 = function(year, month, day) {
    $scope.begin = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.popup1 = {
    opened: false
  };




  // function getDayClass1(data) {
  //   var date1 = data1.date,
  //     mode1 = data1.mode;
  //   if (mode1 === 'day') {
  //     var dayToCheck1 = new Date(date).setHours(0,0,0,0);

  //     for (var i = 0; i < $scope.events1.length; i++) {
  //       var currentDay1 = new Date($scope.events1[i].date).setHours(0,0,0,0);

  //       if (dayToCheck1 === currentDay1) {
  //         return $scope.events1[i].status;
  //       }
  //     }
  //   }

  //   return '';
  // }

//////////////////////////////////////////ACABOU DATA////////////////////////////////////


 ////////////////////////////////COMECA DATA 2//////////////////////////////////////////

  $scope.today2 = function() {
    $scope.end = new Date();
  };
  $scope.today2();

  $scope.clear2 = function() {
    $scope.end = null;
  };

  $scope.inlineOptions2 = {
    customClass: getDayClass2,
    minDate: new Date($scope.begin),
    showWeeks: true
  };

  $scope.dateOptions2 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date($scope.begin),
    startingDay: 1
  };



  $scope.toggleMin2 = function() {
    $scope.inlineOptions2.minDate = $scope.inlineOptions2.minDate ? null : new Date();
    $scope.dateOptions2.minDate = $scope.inlineOptions2.minDate;
  };

    $scope.toggleMin2();


  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };


  $scope.setDate2 = function(year, month, day) {
    $scope.end = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.popup2 = {
    opened: false
  };




  function getDayClass2(data) {
    var date2 = data2.date,
      mode2 = data2.mode;
    if (mode2 === 'day') {
      var dayToCheck2 = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events2.length; i++) {
        var currentDay2 = new Date($scope.events2[i].date).setHours(0,0,0,0);

        if (dayToCheck2 === currentDay2) {
          return $scope.events2[i].status;
        }
      }
    }

    return '';
  }

//////////////////////////////////////////ACABOU DATA////////////////////////////////////


 


   }])

})();


