 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brigadistas')  
    .controller('brigaCadastroCtrl', ['$scope','brigadistaFactory', '$state','ngDialog','$rootScope', 
      function($scope, brigadistaFactory,$state,ngDialog,$rootScope){



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


          
  $scope.initialDate = new Date(2000, 1, 1);
  $scope.input = new brigadistaFactory();  //create new movie instance. Properties will be set via ng-model on UI
  $scope.evento = "o brigadista"

  $scope.input.ativo = true;

  $scope.addBrigadista = function() { //create a new movie. Issues a POST to /api/movies
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
    //$scope.input.name[0] = $scope.input.name[0].toUpperCase();


    $scope.input.$save(function() {
     // $state.reload(); // on success go back to home i.e. movies state.


          $scope.nomeDoEvento = $scope.input.name;
          ngDialog.open({ 
            template: 'app/pages/confirmacoes/confirmacoes.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"brigaCadastroCtrl"
          });  
    });
    console.log($scope.input);
  };

 
 $rootScope.$on('ngDialog.closed', function (e, $dialog) {
    $state.reload();
});

   

   ////////////////////////////////COMECA DATA//////////////////////////////////////////

  $scope.today = function() {
    $scope.dt = new Date();
  };



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
////////////////////////////////COMECA DATA//////////////////////////////////////////

  $scope.today2 = function() {
    $scope.validadeMultiplicador = new Date();
  };



  $scope.clear2 = function() {
    $scope.validadeMultiplicador = null;
  };

  $scope.inlineOptions2 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions2 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };


  $scope.toggleMin = function() {
    $scope.inlineOptions2.minDate = $scope.inlineOptions2.minDate ? null : new Date();
    $scope.dateOptions2.minDate = $scope.inlineOptions2.minDate;
  };

  $scope.toggleMin();

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };


  $scope.setDate2 = function(year, month, day) {
    $scope.validadeMultiplicador = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.popup2 = {
    opened: false
  };


  function getDayClass2(data) {
    var date2 = data.date,
      mode2 = data.mode;
    if (mode2 === 'day') {
      var dayToCheck2 = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay2 = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck2 === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

//////////////////////////////////////////ACABOU DATA////////////////////////////////////

 
  
  
   /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $filter, $uibModal) {
    $scope.picture = $filter('profilePicture')('Nasta');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };


    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
          item.href = link;
        });
    };

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

    $scope.switches = [true, true, false, true, true, false];
  }  

   }])

})();


