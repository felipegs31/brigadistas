 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brigadistas')
  
    .controller('brigaUnicoCtrl', ['$scope','brigadistaFactory', '$state','$stateParams','atividadesFactory','sitesFactory','activitiesFactory', 'comunitiesFactory',
    	function($scope, brigadistaFactory,$state,$stateParams,atividadesFactory,sitesFactory,activitiesFactory,comunitiesFactory){
    	

        //atribuir atividade


      $scope.atividade = {};
      $scope.atividade.rating = 0;
      $scope.max = 3;

      $scope.multiplicadores = [
        {
          valor: 3,
          texto: '3x (9-10)'
        },
        {
          valor: 2,
          texto: '2x (8-9)'
        },
        {
          valor: 1.5,
          texto: '1,5x (7-8)'
        },
        {
          valor: 1,
          texto: '1x (6-7)'
        },
        {
        valor: 0.5,
        texto: '0,5x (5-6)'
        },
        {
          valor: 0.3,
          texto: '0,3 (>5)'
        }  
        ];

       ///////////////////////////


         $scope.deletarAtividades = false;

         $scope.mostraDelecao = function(){
          if($scope.deletarAtividades == false)
            $scope.deletarAtividades = true;
          else
            $scope.deletarAtividades = false;
          }


    	$scope.editar = true;
      $scope.deletarAtividades = false;



      $scope.removeAtividade = function(item){
         atividadesFactory.delete({brigadistaId: $scope.input._id}, {activitieId: item._id})
         .$promise.then(
            function (response) {
              $state.reload();
            }
          );
     }
     ////


    	$scope.gonnaEdit = function()
    	{
    		$scope.editar = false;
    	}


      $scope.carregado = false;

      $scope.rechamadaMarota = function(){
        brigadistaFactory.get({id: $stateParams.id})
          .$promise.then(
              function (response) {
                $scope.smartTableData = response.activities;
                console.log(response);
                var temporario1 = new Date(response.dt); 
                $scope.input.dt = temporario1
              },function (response) {
                  $scope.message = "Error: " + response.status + " " + response.statusText;
              }
          );
      }

    	brigadistaFactory.get({id: $stateParams.id})
        .$promise.then(
            function (response) {
              $scope.input = response;
              $scope.smartTableData = response.activities;
              console.log(response);
              var temporario1 = new Date(response.dt); 
              var temporario2 = new Date(response.validadeMultiplicador); 
              $scope.input.dt = temporario1
              $scope.input.validadeMultiplicador = temporario2;
              var multi = response.multiplicador;

               $scope.input.temwhats = true;
              console.log(typeof (response.temwhats))
              if(response.temwhats === true){
                $scope.input.temwhats = true;
              }else{
                $scope.input.temwhats = false;
              }

              if(response.medicamento == true){
                $scope.input.medicamento = true;
              }else{
                $scope.input.medicamento = false;
              }
             
             if(response.alergia == true){
                $scope.input.alergia = true;
              }else{
                $scope.input.alergia = false;
              }


              for(var i=0; i<  $scope.multiplicadores.length; i++)
              {
                if($scope.multiplicadores[i].valor == multi){
                  $scope.input.multiplicador = $scope.multiplicadores[i].texto;
                  break;
                }
              }

              console.log(response);  
              
                //preechimento de sugestoes de fazendas              
               $scope.fillingSites = [];
               sitesFactory.query(
                  function(sites) {
                    $scope.dadoSite = sites;
                    console.log($scope.dadoSite);

                    for (var i=0; i<sites.length; i++){
                      $scope.fillingSites[i] = sites[i].name
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
                    console.log($scope.fillingSites);

                      //preenchimento das atividades
                      $scope.filling = [];
                       activitiesFactory.query(
                            function (respActiv) {   
                              $scope.dadoAtividade = respActiv;
                              console.log($scope.dadoAtividade);

                              for (var i=0; i<respActiv.length; i++){
                                $scope.filling[i] = respActiv[i].name
                              }                              
                              console.log($scope.filling);

                            },
                            function (respActiv) {
                                $scope.message = "Error: " + respActiv.status + " " + respActiv.statusText;
                            }
                        );

                  },
                  function(sites) {
                      $scope.message = "Error: " + sites.status + " " + sites.statusText;
                  }
                );      

              $scope.carregado = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );


        //edicao do brigadista


        $scope.saveChanges = function()
        {

          var string = $scope.input.name.split(" ");

          if(!$scope.input.hasOwnProperty("dt")){
            $scope.warning = "Insira uma data de nascimento";
            return;
          }else if(!$scope.input.hasOwnProperty("validadeMultiplicador")){
            $scope.warning = "Insira uma data de expiração para o multiplicador";
            return;
          }else if(string.length < 2){
             $scope.warning = "Insira o nome completo";
             return;
          }else if($scope.input.multiplicador == undefined){
            $scope.warning = "Insira um multiplicador de nota";
            return;
          }

          if($scope.input.multiplicador != undefined){
            $scope.input.multiplicador = $scope.input.multiplicador.valor;
          }
    
            brigadistaFactory.update({id: $stateParams.id},$scope.input);
            $scope.editar = true;                        
        }

         $scope.discardChanges =  function()
         {
              brigadistaFactory.get({id: $stateParams.id})
              .$promise.then(
              function (response) {
                $scope.input = response;
                console.log(response);
                $scope.carregado = true;
              },
              function (response) {
                  $scope.message = "Error: " + response.status + " " + response.statusText;
              }
          );
              $scope.editar = true;

         }

        ///// 
      $scope.atividade = {};
      $scope.payload = {};
      
      $scope.addActivities = function(){

      console.log($scope.atividade.rating);

      if($scope.atividade.rating == undefined){
        console.log("entrou no erro");
        $scope.warningAtividade = "Coloque o número de estrelas"
        return;
      }

      for(var i=0; i<$scope.dadoAtividade.length; i++){

        if($scope.atividade.atividade == $scope.dadoAtividade[i].name){
          $scope.payload.activitie = $scope.dadoAtividade[i]._id;
          $scope.atividadePontos = $scope.dadoAtividade[i].points;
          console.log("passou");
          break;
        }
      }


      console.log($scope.atividade)
      var multiplicador;
     // $scope.payload.activitie = $scope.input._id;
      $scope.payload.dt = $scope.atividade.dt;
      $scope.payload.rating = $scope.atividade.rating;

      if($scope.atividade.rating == 1){
        multiplicador = -0.5;
      }else if($scope.atividade.rating == 3){
        multiplicador = 2
      }else{
        multiplicador = 1;
      }


      $scope.payload.brutPoints = ($scope.atividadePontos * multiplicador).toFixed(2);


      console.log($scope.payload.activitie)
      $scope.payload.site  = $scope.atividade.site

      console.log($scope.payload);
    
      atividadesFactory.save({brigadistaId: $stateParams.id}, $scope.payload)
      .$promise.then(
        function(response){
          $state.reload();
        }, function(response){

        });

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

////////////////////////////////COMECA DATA 2//////////////////////////////////////////

  $scope.today3 = function() {
    $scope.validadeMultiplicador = new Date();
  };
  $scope.today3();

  $scope.clear3 = function() {
    $scope.validadeMultiplicador = null;
  };


  $scope.inlineOptions3 = {
    customClass: getDayClass3,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions3 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };


  $scope.toggleMin3 = function() {
    $scope.inlineOptions3.minDate = $scope.inlineOptions3.minDate ? null : new Date();
    $scope.dateOptions3.minDate = $scope.inlineOptions3.minDate;
  };

  $scope.toggleMin3();

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };


  $scope.setDate3 = function(year, month, day) {
    $scope.validadeMultiplicador = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.popup3 = {
    opened: false
  };




  function getDayClass3(data) {
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

////////////////////////////////COMECA DATA 3//////////////////////////////////////////

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };


  $scope.inlineOptions = {
    customClass: getDayClass2,
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

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };


  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.popup2 = {
    opened: false
  };




  function getDayClass2(data) {
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


