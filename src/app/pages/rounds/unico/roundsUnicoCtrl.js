 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rounds')
    .controller('roundsUnicoCtrl', ['$scope','roundsFactory', '$state','$stateParams', 'brigadistaFactory','sitesFactory','comunitiesFactory','fecharRoundFactory',
    	function($scope, roundsFactory,$state,$stateParams,brigadistaFactory,sitesFactory,comunitiesFactory,fecharRoundFactory){
    	
      
      var sort_by = function(field, reverse, primer){
         var key = primer ? 
             function(x) {return primer(x[field])} : 
             function(x) {return x[field]};

         reverse = !reverse ? 1 : -1;

         return function (a, b) {
             return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
           } 
      }


    	$scope.editar = true;

    	$scope.gonnaEdit = function()
    	{
    		$scope.editar = false;
    	}

      $scope.carregado = false;

      $scope.hasEnded = false;
///////////////get data/////////////////////
       roundsFactory.get({id: $stateParams.id})
        .$promise.then(
            function (saida) {
              $scope.input = saida;
              console.log(saida);

              if(saida.hasEnded == true){
                console.log("entrou estranho")
                $scope.hasEnded = true;
              }
             
              var temporario1 = new Date(saida.begin);
              var temporario2 = new Date(saida.end);
              var paralogica = new Date(saida.end);
              $scope.input.begin = temporario1;
              $scope.input.end = temporario2;
              var paralogica = paralogica.setDate(temporario2.getDate() + 1);
             // console.log(paralogica);
              //possibilita o botao de fechar aparecer
              var hoje = new Date()
            //  console.log(hoje)
              $scope.dataPossivel = false;
              if ( hoje >= paralogica){
                $scope.dataPossivel = true;
              }


                /////////////////fazer o ranking//////////
                $scope.carregado2 = false;
                
                brigadistaFactory.query(
                  function(dados) {
                    console.log(dados);

                    if(!$scope.hasEnded){

                    console.log("entrei");
                    $scope.smartTableData = dados;

                    for(var i=0; i<$scope.smartTableData.length; i++){
                      $scope.smartTableData[i].pontosTotais = 0;
                      $scope.smartTableData[i].mediaEstrelas = 0;
                    }

                    var dataAtividade;
                    var contador;
                    var pontosDeCadaPessoa = []; 
                    
                    for(var i=0; i<$scope.smartTableData.length; i++){
                      contador = 0;
                      for(var j=0; j<$scope.smartTableData[i].activities.length; j++){
                        //console.log($scope.smartTableData[i].activities[j].site.name);
                        var flagPassou = false;
                        

                        for(var k=0; k<saida.participantSites.length; k++){
                          console.log(saida.participantSites[k]);
                          console.log($scope.smartTableData[i].activities[j].site);
                          if(saida.participantSites[k] == 'Todos'){
                            flagPassou = true;
                            break;
                          }else if($scope.smartTableData[i].activities[j].site == saida.participantSites[k]){
                            flagPassou = true;
                            break;
                          }
                        }

                        if(flagPassou){
                          dataAtividade = new Date($scope.smartTableData[i].activities[j].dt);
                          //console.log('entrou');
                          if( temporario1 <= dataAtividade &&  dataAtividade <= temporario2){
                            
                            $scope.smartTableData[i].pontosTotais = $scope.smartTableData[i].pontosTotais + $scope.smartTableData[i].activities[j].brutPoints * $scope.smartTableData[i].multiplicador ;
                            $scope.smartTableData[i].mediaEstrelas = $scope.smartTableData[i].mediaEstrelas + $scope.smartTableData[i].activities[j].rating;
                            contador++;
                          }
                        }
                         
                      }
                      $scope.smartTableData[i].mediaEstrelas = ($scope.smartTableData[i].mediaEstrelas / contador).toFixed(2);
                      $scope.smartTableData[i].numberAct = contador;
                      pontosDeCadaPessoa[i] = $scope.smartTableData[i].pontosTotais;

                    }

                    console.log(pontosDeCadaPessoa);

                    //faz ranking
                    var sorted = pontosDeCadaPessoa.slice().sort(function(a,b){return b-a})
                    var ranks = pontosDeCadaPessoa.slice().map(function(v){ return sorted.indexOf(v)+1 });
  
                    console.log(ranks);

                    for(var i=0; i<$scope.smartTableData.length; i++){
                        $scope.smartTableData[i].rank = ranks[i];
                    }


                    $scope.smartTableData.sort(sort_by('rank', true, parseInt));

                    console.log($scope.smartTableData);
                    $scope.smartTableData.reverse();

                    var tamanhoTabela = $scope.smartTableData.length;

                    for(var i=tamanhoTabela-1; i>=0; i--){
                        console.log($scope.smartTableData[i].mediaEstrelas);
                        console.log(i);
                        if($scope.smartTableData[i].mediaEstrelas == 'NaN')
                          $scope.smartTableData.splice(i,1);
                    }

                    console.log("entrou errado");
          
                  }else{
                    $scope.smartTableData = $scope.input.final
                    console.log($scope.smartTableData);
                  }
                    $scope.carregado2 = true;

                  },
                  function(response) {
                      $scope.message = "Error: " + response.status + " " + response.statusText;
                  }
                );
                     
                ///////////// acaba o ranking////////////////
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


              $scope.carregado = true;
            },
            function (saida) {
                $scope.message = "Error: " + saida.status + " " + saida.statusText;
            }
        );



       $scope.set_color = function (item) {
        if (item.rank == 1) {
            return { 'background-color':'#FFD700'}
          }
        else if (item.rank == 2) {
            return { 'background-color':'#c0c0c0'}
        }
        else if (item.rank == 3) {
            return { 'background-color':'#dca570'}
          }

        }

        $scope.saveChanges = function()
        {
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
            roundsFactory.update({id: $stateParams.id},$scope.input)
            .$promise.then(
            function (saida) {
              $state.reload();
            })
              
                                 
        }

         $scope.discardChanges =  function()
         {
              roundsFactory.get({id: $stateParams.id})
              .$promise.then(
              function (response) {
                $scope.input = response;
                console.log(response);
                var temporario1 = new Date(response.begin);
                var temporario2 = new Date(response.end);
                $scope.input.begin = temporario1;
                $scope.input.end = temporario2;
                $scope.warning = "";
                $scope.carregado = true;



              },
              function (response) {
                  $scope.message = "Error: " + response.status + " " + response.statusText;
              }
          );
              $scope.editar = true;

         }


         $scope.fecharRound = function(){

            console.log($scope.smartTableData);
            fecharRoundFactory.save({id: $stateParams.id}, $scope.smartTableData);
            $state.reload();



         }

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




  function getDayClass1(data) {
    var date1 = data1.date,
      mode1 = data1.mode;
    if (mode1 === 'day') {
      var dayToCheck1 = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events1.length; i++) {
        var currentDay1 = new Date($scope.events1[i].date).setHours(0,0,0,0);

        if (dayToCheck1 === currentDay1) {
          return $scope.events1[i].status;
        }
      }
    }

    return '';
  }

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


