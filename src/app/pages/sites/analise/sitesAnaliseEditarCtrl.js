 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sites')
    
     .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    })

    .controller('sitesAnaliseEditarCtrl', ['$scope','sitesFactory', '$state','$stateParams','registroFactory','ngDialog','$rootScope','AuthFactory',
    	function($scope, sitesFactory,$state,$stateParams,registroFactory,ngDialog,$rootScope,AuthFactory){

        var verde =  "rgb(119, 255, 114)";
        var amarelo = "rgb(255, 255, 114)";
        var vermelho = "rgb(255, 103, 103)";

        ///!!!  CUIDADO, SOMENTA ESTA PAGINA ESTA INDEXADA A PARTIR DO 1!!!! COLUNA X LINHA index. Mta loucura 

       


        $scope.editar = true;
        $scope.mostrarAbstracao = false;

        registroFactory.get({siteId: $stateParams.id},{registroId: $stateParams.id2})
        .$promise.then(
            function (response) {
              $scope.input = response;
              $scope.colunas = response.colunaDaAnalise;
              $scope.linhas = response.linhaDaAnalise;
              $scope.input.dt = new Date($scope.input.dt); 

              console.log($scope.colunas);
              console.log($scope.linhas);

              $scope.letras = [];
              $scope.linhasTabela = [];
            
              for(var i=1; i<=$scope.linhas;i++){
                $scope.linhasTabela.push(i);
              }

              for(var i=0; i<$scope.colunas;i++){
                $scope.letras.push(String.fromCharCode('A'.charCodeAt(0) + i));
              }
              console.log($scope.input);
              $scope.arr = [];
                for(var i=1; i<=$scope.colunas; i++){
                  $scope.arr[i] = [];
                  for(var j=1; j<= $scope.linhas; j++){
                    $scope.arr[i][j] = [];
                  }
                }
                  
            
              $scope.carregado = true;
             
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );


        $scope.discardChanges = function(){
         $state.reload();
        }

        
        //Executado apenas quando o repeat terminar

       $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

          var totaldeitens = $scope.colunas*$scope.linhas
          for(var i=1; i<= totaldeitens; i++){
               $scope.pintar($scope.input.singular[i].estrutura,      $scope.input.singular[i].posicao, 1);
               $scope.pintar($scope.input.singular[i].morfologia,     $scope.input.singular[i].posicao, 2);
               $scope.pintar($scope.input.singular[i].crescimento,    $scope.input.singular[i].posicao, 3);
               $scope.pintar($scope.input.singular[i].mudasAmarradas, $scope.input.singular[i].posicao, 4);
               $scope.pintar($scope.input.singular[i].epifitas,       $scope.input.singular[i].posicao, 5);
               $scope.pintar($scope.input.singular[i].herbivoria,     $scope.input.singular[i].posicao, 6);                  
          }
        
        })


        $scope.pintar = function(cor,id,indicador){
          var palhetaDeCores = ["","rgb(119, 255, 114)","rgb(255, 255, 114)","rgb(255, 103, 103)" ]
          //verde, amarelo, vermelho

          var n = String.fromCharCode(parseInt(id.charAt(0)) + 'A'.charCodeAt(0) - 1);
          var nn = parseInt(id.charAt(0));
          var parte1 = parseInt(id.charAt(1))
          var concatenadorFinal = n+""+parte1+indicador;
          var concatenadorAbstracao = n+""+parte1;
          console.log(concatenadorFinal);

          document.getElementById(concatenadorFinal).style.backgroundColor = palhetaDeCores[cor];
          $scope.arr[nn][parte1][indicador] = cor;


          //document.getElementById(concatenadorAbstracao).style.backgroundColor = palhetaDeCores[cor];

        }

        $scope.$on('ngRepeatFinishedAbstracao', function(ngRepeatFinishedEvent) {

          var totaldeitens = $scope.colunas*$scope.linhas
          for(var i=1; i<= totaldeitens; i++){
               $scope.pintarAbstracao($scope.input.singular[i].avaliacaoSingular, $scope.input.singular[i].posicao);
              
          }
        
        })

        $scope.pintarAbstracao = function(cor,id){
          var palhetaDeCores = ["","rgb(119, 255, 114)","rgb(255, 255, 114)","rgb(255, 103, 103)" ]
          //verde, amarelo, vermelho

          var n = String.fromCharCode(parseInt(id.charAt(0)) + 'A'.charCodeAt(0) - 1);
          var parte1 = parseInt(id.charAt(1))
          var concatenadorAbstracao = n+""+parte1;
          console.log(concatenadorAbstracao);
  
          document.getElementById(concatenadorAbstracao).style.backgroundColor = palhetaDeCores[cor];

        }


      $scope.abstracao = function(){
        if( $scope.mostrarAbstracao == false)
          $scope.mostrarAbstracao = true;
        else
           $scope.mostrarAbstracao = false;
      }


        $scope.mudarCor = function(id){
          //console.log(id);
          if($scope.editar) return;
                    
          var n = id.charAt(0).charCodeAt(0) - 'A'.charCodeAt(0) + 1; 
          var cor = document.getElementById(id).style.backgroundColor;
          var i = id.charAt(1);
          var j = id.charAt(2);
     
          if(cor == verde){
            document.getElementById(id).style.backgroundColor = amarelo;
            $scope.arr[n][i][j] = 2;
          }
          else if(cor == amarelo){
            document.getElementById(id).style.backgroundColor = vermelho;
            $scope.arr[n][i][j] = 3;
          }
          else if (cor == vermelho){
            document.getElementById(id).style.backgroundColor = verde;
            $scope.arr[n][i][j] = 1;
          }
          else{ 
            document.getElementById(id).style.backgroundColor = verde;
            $scope.arr[n][i][j] = 1;
          }

          //console.log($scope.arr[n][i][j]);
        }



      $scope.gonnaEdit= function(){
        $scope.editar = false;
        console.log($scope.arr);
      }



        var pontosSingular;
        // $scope.dadosFinais = [][];
         $scope.saveChanges = function(){

          var insercao = 1;
          for(var i=1; i<= $scope.colunas; i++){

            for(var j=1; j<=$scope.linhas; j++){

              pontosSingular = 0;

              for(var k=1; k<=6; k++){ 
               
                if($scope.arr[i][j][k] === undefined){
                  $scope.warning = "preecha todos os campos";
                  return;
                }


                $scope.input.singular[insercao].posicao = i+""+j;
                console.log($scope.input.singular[insercao].posicao); 
               
                
                if(k==1){
                  $scope.input.singular[insercao].estrutura = $scope.arr[i][j][k]; 
                }else if(k==2)
                  $scope.input.singular[insercao].morfologia = $scope.arr[i][j][k];
                else if(k==3)
                  $scope.input.singular[insercao].crescimento = $scope.arr[i][j][k];
                else if(k==4)
                  $scope.input.singular[insercao].mudasAmarradas = $scope.arr[i][j][k];
                else if(k==5)
                  $scope.input.singular[insercao].epifitas = $scope.arr[i][j][k];
                else if(k==6)
                  $scope.input.singular[insercao].herbivoria = $scope.arr[i][j][k];

                pontosSingular += $scope.arr[i][j][k];

              }
              

              if(pontosSingular < 9){
                $scope.input.singular[insercao].avaliacaoSingular = 1;
              }else if(pontosSingular < 12){
                $scope.input.singular[insercao].avaliacaoSingular = 2;
              }else{
                $scope.input.singular[insercao].avaliacaoSingular = 3;
              }

              insercao++;
            }
          }

          $scope.algoAvalGeral();


          
          $scope.input.postedBy = AuthFactory.getUsername();
          console.log($scope.input);
      
         
          registroFactory.update( {siteId: $stateParams.id, 
                                  registroId: $stateParams.id2
                                  }, 
                                  $scope.input)
          .$promise.then(
            function (response) {
               $state.reload();
              console.log("sucesso");
            },function(response){
               $scope.message = "Error: " + response.status + " " + response.statusText;
            })
          


         }



         $scope.algoAvalGeral = function(){
            var numeroObjetos = $scope.colunas * $scope.linhas;
            var somatorioAlgoAvalGeral = 0;
            var maximo = numeroObjetos*3;
            var minimo = numeroObjetos*1;
            var diff = maximo - minimo;
            var otimo = Math.floor(minimo + diff*0.3);
            var medio = Math.floor(minimo + diff*0.6);

            for(var i=1; i<=numeroObjetos; i++){
                somatorioAlgoAvalGeral += $scope.input.singular[i].avaliacaoSingular;
            }

            if(somatorioAlgoAvalGeral < otimo)
              $scope.input.avaliacaoGeral = 1;
            else if(somatorioAlgoAvalGeral < medio)
              $scope.input.avaliacaoGeral = 2;
            else
              $scope.input.avaliacaoGeral = 3;

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


