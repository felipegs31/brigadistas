 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sites')
    .controller('sitesAnaliseCtrl', ['$scope','sitesFactory', '$state','$stateParams','registroFactory','ngDialog','$rootScope','AuthFactory',
    	function($scope, sitesFactory,$state,$stateParams,registroFactory,ngDialog,$rootScope,AuthFactory){

        ///!!!  CUIDADO, SOMENTA ESTA PAGINA ESTA INDEXADA A PARTIR DO 1!!!!

        $scope.evento = "o registro"


        sitesFactory.get({id: $stateParams.id})
        .$promise.then(
            function (response) {
              
              $scope.colunas = response.coluna;
              $scope.linhas = response.linha;

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

              //inicialização de um array de 3 dimensoes
                $scope.arr = [];
                for(var i=1; i<=$scope.colunas; i++){
                  $scope.arr[i] = [];
                  for(var j=1; j<= $scope.linhas; j++){
                    $scope.arr[i][j] = [];
                  }
                }
                    
              $scope.input = {}

         
            var numeroObjetos = $scope.colunas * $scope.linhas;
            $scope.input.singular = new Array();
            for (var i = 0; i <=numeroObjetos; i++)
                $scope.input.singular.push(new Object({
                posicao: 0,
                estrutura: 0,
                morfologia: 0,
                crescimento: 0,
                epifitas: 0,
                herbivoria: 0,
                avaliacaoSingular: 0
             })
            );

             console.log($scope.input.singular); 
            
              $scope.carregado = true;
             
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

          var verde =  "rgb(119, 255, 114)";
          var amarelo = "rgb(255, 255, 114)";
          var vermelho = "rgb(255, 103, 103)";
          var cinza = "rgb(205, 205, 205)";


        


        $scope.mudarCor = function(id){
          //console.log(id);
                    
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



        


         

         var pontosSingular;
        // $scope.dadosFinais = [][];


         $scope.addDados = function(){

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


          console.log($scope.input); 
          $scope.input.colunaDaAnalise =  $scope.colunas;
          $scope.input.linhaDaAnalise =  $scope.linhas;
          $scope.input.postedBy = AuthFactory.getUsername();

         
          registroFactory.save({siteId: $stateParams.id}, $scope.input)
          .$promise.then(
              function (response) {
                $scope.nomeDoEvento = ""

                ngDialog.open({ 
                  template: 'app/pages/confirmacoes/confirmacoes.html', 
                  scope: $scope, 
                  className: 'ngdialog-theme-default', 
                  controller:"sitesAnaliseCtrl"
               });  
            }
          );
          
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

          $rootScope.$on('ngDialog.closed', function (e, $dialog) {
              $state.reload();
          });


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


