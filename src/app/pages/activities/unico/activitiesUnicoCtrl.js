 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.activities')
    .controller('activitiesUnicoCtrl', ['$scope','activitiesFactory', '$state','$stateParams', 'brigadistaFactory', '$http', 'sitesFactory', 'atividadesFactory','comunitiesFactory',
    	function($scope, activitiesFactory,$state,$stateParams,brigadistaFactory,$http,sitesFactory,atividadesFactory,comunitiesFactory){
    	
    	$scope.editar = true;



      $('#asd1').css('z-index !important', 2 );
      $('#asd2').css('z-index !important',-1);
  

    	$scope.gonnaEdit = function()
    	{
    		$scope.editar = false;
    	}

      $scope.filling = [];

       brigadistaFactory.query(
          function(response) {
            $scope.dadoBrigadista= response;
            console.log(response)
            for (var i=0; i<response.length; i++){
              $scope.filling[i] = response[i].name
            }
            console.log($scope.filling);
          },
          function(response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );      

        $scope.fillingSites = [];
       sitesFactory.query(
          function(response) {
            $scope.dadoSite = response;
            console.log($scope.dadoSite);
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

          },
          function(response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );      


      $scope.carregado = false;
    	activitiesFactory.get({id: $stateParams.id})
        .$promise.then(
            function (response) {
              $scope.input = response;     
              $scope.carregado = true;
              console.log($scope.input);
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.saveChanges = function()
        {
            activitiesFactory.update({id: $stateParams.id},$scope.input);
            $scope.editar = true;                        
        }

         $scope.discardChanges =  function()
         {
              activitiesFactory.get({id: $stateParams.id})
              .$promise.then(
              function (response) {
                $scope.input = response;
                $scope.carregado = true;
              },
              function (response) {
                  $scope.message = "Error: " + response.status + " " + response.statusText;
              }
          );
              $scope.editar = true;

         }


      $scope.rate = 2;
      $scope.max = 3;


      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
       
      };

      $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];

    $scope.atividade = {};
    $scope.atividade.rating = 2;
    $scope.payload = {}
    $scope.idzao = [];
    
    
    $scope.addActivities = function(){

      var multiplicador;
      $scope.payload.activitie = $scope.input._id;
      $scope.payload.dt = $scope.atividade.dt;
      $scope.payload.rating = $scope.atividade.rating;

      if($scope.atividade.rating == 1){
        multiplicador = -0.5;
      }else if($scope.atividade.rating == 3){
        multiplicador = 2
      }else{
        multiplicador = 1;
      }

      $scope.payload.brutPoints = ($scope.input.points * multiplicador).toFixed(2);

      for(var i=0; i<$scope.dadoBrigadista.length; i++){
        if($scope.atividade.brigadista == $scope.dadoBrigadista[i].name){
          $scope.idzao = $scope.dadoBrigadista[i]._id;
          break;
        }
      }

     
      $scope.payload.site  = $scope.atividade.site;



      console.log($scope.payload);

      atividadesFactory.save({brigadistaId: $scope.idzao}, $scope.payload);
      $scope.retorno = $scope.atividade; 
      $scope.atividade = {"rating" : 2};

    }

    $scope.deletarAtividade = function(){

      brigadistaFactory.get({id: $scope.idzao})
        .$promise.then(
            function (response) {
              $scope.paraDelecao = response;
              //console.log( $scope.paraDelecao.activities[$scope.paraDelecao.activities.length-1]._id);
              atividadesFactory.delete({brigadistaId: $scope.idzao}, {activitieId: $scope.paraDelecao.activities[$scope.paraDelecao.activities.length-1]._id});
              $scope.retorno = false;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
  
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
  }

//////////////////////////////////////////ACABOU DATA////////////////////////////////////



  }])
    
})();


