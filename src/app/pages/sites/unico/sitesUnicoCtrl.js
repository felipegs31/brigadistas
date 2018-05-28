 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sites')
    .controller('sitesUnicoCtrl', ['$scope','sitesFactory', '$state','$stateParams', 'ngDialog', 'registroFactory','$element', 'baConfig', 'layoutPaths','$filter',
    	function($scope, sitesFactory,$state,$stateParams,ngDialog,registroFactory,$element, baConfig, layoutPaths,$filter){


    	   $scope.deletarAtividades = false;

         $scope.mostraDelecao = function(){
          if($scope.deletarAtividades == false)
            $scope.deletarAtividades = true;
          else
            $scope.deletarAtividades = false;
          }

       $scope.removeAtividade = function(item){
          registroFactory.delete({siteId: $stateParams.id},{registroId: item})
          .$promise.then(
            function(response){
              $state.reload();
            }, function(response){

            })
        }


         $scope.sortFunction = function(a,b){  
              var dateA = new Date(a.dt).getTime();
              var dateB = new Date(b.dt).getTime();
              return dateA < dateB ? 1 : -1;  
          }; 

          $scope.sortChartFunction = function(a,b){  
              var dateA = new Date(a.dt).getTime();
              var dateB = new Date(b.dt).getTime();
              return dateA > dateB ? 1 : -1;  
          }; 

    	$scope.editar = true;

    	$scope.gonnaEdit = function()
    	{
    		$scope.editar = false;
    	}

      $scope.carregado = false;

    	sitesFactory.get({id: $stateParams.id})
        .$promise.then(
            function (response) {

              $scope.input = response;
              $scope.smartTableData = response.analysis;
              $scope.chartData = response.analysis;
            //  console.log(response.analysis);
              

              $scope.smartTableData.sort($scope.sortFunction)
              $scope.chartData.sort($scope.sortChartFunction)

              for(var i=1; i<$scope.smartTableData.length; i++){
                var intervalo =  Math.floor((Date.parse($scope.smartTableData[i].dt) - Date.parse($scope.smartTableData[i-1].dt)) / 86400000); 
                $scope.smartTableData[i].intervalo = intervalo;
              }

              for(var i=1; i<$scope.smartTableData.length; i++){
                var diff = ((($scope.smartTableData[i].peso*100)/$scope.smartTableData[i-1].peso) - 100).toFixed(2);
                $scope.smartTableData[i].diff = diff;
              }

              for(var i=1; i<$scope.smartTableData.length; i++){
                 $scope.smartTableData[i].diffdiario = ($scope.smartTableData[i].diff/$scope.smartTableData[i].intervalo).toFixed(2);;
              }

              console.log($scope.smartTableData);
              

              $scope.criaGrafico($scope.chartData);
              
              
              
            
              $scope.carregado = true;
             
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );


        $scope.saveChanges = function()
        {
            sitesFactory.update({id: $stateParams.id},$scope.input);
            $scope.editar = true;                        
        }

         $scope.discardChanges =  function()
         {
              sitesFactory.get({id: $stateParams.id})
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
//////////////////////////////////////////// COMECA GRAFICO ////////////////////////

$scope.criaGrafico = function(dados){
  console.log(dados);


  $scope.parachart = new Array();
  for (var i = 0; i <dados.length; i++)
      $scope.parachart.push(new Object({
      "date" : 0,
      "peso" : 0,
      "vermelho" : 0
   })
  );

  var numVermelho = 0;

  for(var i=0; i<dados.length; i++){
    
    numVermelho = 0;
    $scope.parachart[i].date = $filter('date')(new Date($scope.smartTableData[i].dt), "dd/MM/yyyy");
    $scope.parachart[i].peso = $scope.smartTableData[i].peso;

    for(var j=1; j<dados[i].singular.length; j++){
      if(dados[i].singular[j].avaliacaoSingular == 3){
        numVermelho++;
      }
    }

    $scope.parachart[i].vermelho = numVermelho;
  }



 var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var chart = AmCharts.makeChart(id, {
      "type": "serial",
      "theme": "none",
      "color": layoutColors.defaultText,
      "dataDateFormat": "DD-MM-YYYY",
      "precision": 2,
      "valueAxes": [
      {
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText,
        gridColor: layoutColors.defaultText,
        "id": "v1",
        "title": "Vermelho",
        "position": "left",
        "autoGridCount": false,
        
      }, {
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText,
        gridColor: layoutColors.defaultText,
        "id": "v2",
        "title": "Peso Total [Kg]",
        "gridAlpha": 0,
        "position": "right",
        "autoGridCount": false
      }],
      "graphs": [{
        "id": "g3",
        color: layoutColors.danger,
        "valueAxis": "v1",
        "lineColor": layoutColors.danger,
        "fillColors": layoutColors.danger,
        "fillAlphas": 0.8,
        "lineAlpha": 0.8,
        "type": "column",
        "title": "Vermelho",
        "valueField": "vermelho",
        "clustered": false,
        "columnWidth": 0.5,
        "lineColorField" : layoutColors.danger,
        "legendValueText": "$[[value]]",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }, {
        "id": "g2",
        "valueAxis": "v2",
        color: layoutColors.defaultText,
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": layoutColors.defaultText,
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "lineColor": layoutColors.warning,
        "type": "smoothedLine",
        "dashLength": 5,
        "title": "Peso",
        "useLineColorForBulletBorder": true,
        "valueField": "peso",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]Kg</b>"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset": 30,
        gridAlpha: 0,
        color: layoutColors.defaultText,
        scrollbarHeight: 50,
        backgroundAlpha: 0,
        selectedBackgroundAlpha: 0.05,
        selectedBackgroundColor: layoutColors.defaultText,
        graphFillAlpha: 0,
        autoGridCount: true,
        selectedGraphFillAlpha: 0,
        graphLineAlpha: 0.2,
        selectedGraphLineColor: layoutColors.defaultText,
        selectedGraphLineAlpha: 1
      },
      "chartCursor": {
        "pan": true,
        "cursorColor" : layoutColors.danger,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha": 0,
        "valueLineAlpha": 0.2
      },
      "categoryField": "date",
      "categoryAxis": {
        "axisColor": layoutColors.defaultText,
        "color": layoutColors.defaultText,
        "gridColor": layoutColors.defaultText,
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "legend": {
        "useGraphSettings": true,
        "position": "top",
        "color": layoutColors.defaultText
      },
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "export": {
        "enabled": true
      },
     "dataProvider": $scope.parachart,
      pathToImages: layoutPaths.images.amChart
    });


  }





  }]) 
    
})();

        // "date": "2013-01-30",
        // "market1": 81,
        // "market2": 85,
        // "sales1": 4,
        // "sales2": 7

