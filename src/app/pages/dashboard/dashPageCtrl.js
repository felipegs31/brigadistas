 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.activities')
    .controller('dashPageCtrl', ['$scope', '$timeout','$interval','NgMap','sitesFactory','comunitiesFactory','roundsFactory', 'brigadistaFactory',
    	function($scope,$timeout,$interval,NgMap,sitesFactory,comunitiesFactory,roundsFactory,brigadistaFactory){
    	

        function sortFunction(a,b){  
              var dateA = new Date(a.dt).getTime();
              var dateB = new Date(b.dt).getTime();
              return dateA < dateB ? 1 : -1;  
          }; 

        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        $scope.roundsAberos = [];
        $scope.roundsFechados = [];

        $scope.carregadoSites = false;

          sitesFactory.query(
            function(response) {
              $scope.sites = response;
              console.log(response);

              for(var i=0; i<  $scope.sites.length; i++){
                for(var j=0; j<  $scope.sites[i].analysis.length; j++){
                    $scope.sites[i].analysis[j].dt = new Date($scope.sites[i].analysis[j].dt);                  
                }
                $scope.sites[i].analysis.sort(sortFunction)
              }
           //   console.log($scope.sites)

           // notificação de sites para fechar

                comunitiesFactory.query(
                function(comunidade) {
                  $scope.comunities = comunidade;
                },
                function(comunidade) {
                    $scope.message = "Error: " + comunidade.status + " " + comunidade.statusText;
                }
                );

                roundsFactory.query(
                  function(rounds) {
                    $scope.rounds = rounds;
                    console.log($scope.rounds);

                    for(var i=0; i<$scope.rounds.length; i++){
                      if($scope.rounds[i].hasEnded == false){
                        $scope.roundsAberos.push($scope.rounds[i]);
                      }else{
                        $scope.roundsFechados.push($scope.rounds[i]);
                      }
                    }


                    $scope.mostraRoundParaFechar = false;

                    $scope.roundsAberos.reverse();
                    $scope.roundsFechados.reverse();
                    $scope.roundsFechados =  $scope.roundsFechados.slice(0, 5);



                    $scope.roundParaFechar = [];
                    var dataDeHoje = new Date();
                    console.log(dataDeHoje);
                    for(var i=0; i<$scope.rounds.length; i++){
                       if($scope.rounds[i].hasEnded == false){
                        var dataDoRound = new Date($scope.rounds[i].end)
                        if (dataDeHoje > dataDoRound ){
                          $scope.roundParaFechar.push($scope.rounds[i]);
                        }
                      }
                    }

                     if($scope.roundParaFechar.length != 0){
                      $scope.mostraRoundParaFechar = true;
                     }

                    console.log($scope.roundParaFechar);
                  },
                  function(rounds) {
                      $scope.message = "Error: " + response.status + " " + response.statusText;
                  }
                );      

              $scope.carregadoSites = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );      


        brigadistaFactory.query(
          function(response) {
            $scope.brigadistas = response;
            console.log($scope.brigadistas);
           $scope.brigadistasValidadeMultiplicador = [];
           $scope.mostraBrigadistaValido = false;
           var dataDeHoje = new Date();
          
           for(var i=0; i<$scope.brigadistas.length; i++){
           
                var validadeDoMultiplicador = new Date($scope.brigadistas[i].validadeMultiplicador);
                console.log(validadeDoMultiplicador);
                if(dataDeHoje > validadeDoMultiplicador) {
                  $scope.brigadistasValidadeMultiplicador.push($scope.brigadistas[i])
                }            
            
           }

           console.log($scope.brigadistasValidadeMultiplicador);

            if($scope.brigadistasValidadeMultiplicador != 0){
                $scope.mostraBrigadistaValido = true;   
            }
           

          },
          function(response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );   

        $scope.showCity = function(event, city) {
            console.log(city);
            $scope.selectedCity = city;
            $scope.peso = "";
            if(city.analysis.length != 0){
              $scope.peso = city.analysis[0].peso + " Kg";
            }

            $scope.map.showInfoWindow('myInfoWindow', this);
        };


        $scope.customIcon = {
          "scaledSize": [32, 32],
          "url": "./assets/img/marker_purple.png"
        };    

         $scope.customIconSites = {
          "scaledSize": [32, 32],
          "url": "./assets/img/marker_purple.png"
        };    

        $scope.iconeCerto = function(site){
            if(site.analysis.length != 0){
              var a = site.analysis[0].avaliacaoGeral;
              if(a == 1){
                  $scope.customIconSites = {
                    "scaledSize": [32, 32],
                    "url": "./assets/img/marker_green.png"
                  };
                  return $scope.customIconSites
              }else if(a == 2){
                  $scope.customIconSites = {
                    "scaledSize": [32, 32],
                    "url": "./assets/img/marker_yellow.png"
                  };
                  return $scope.customIconSites
              }else{
                  $scope.customIconSites = {
                    "scaledSize": [32, 32],
                    "url": "./assets/img/marker_red.png"
                  };
                  return $scope.customIconSites
              }
            }

        }
        


     


  }])
    
})();


