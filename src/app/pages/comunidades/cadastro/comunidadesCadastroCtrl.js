 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.comunidades')  
    .controller('comunidadesCadastroCtrl', ['$scope','comunitiesFactory', '$state', 'fileReader', '$filter', '$uibModal', 'ngDialog','$rootScope', 
     function($scope, comunitiesFactory,$state, fileReader, $filter, $uibModal,ngDialog,$rootScope){


  $scope.input = new comunitiesFactory();  //create new movie instance. Properties will be set via ng-model on UI
  $scope.evento = "a comunidade"

  $scope.addComunity = function() { //create a new movie. Issues a POST to /api/movies
    $scope.input.$save(function() {
      $scope.nomeDoEvento = $scope.input.name;
      ngDialog.open({ 
            template: 'app/pages/confirmacoes/confirmacoes.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"comunidadesCadastroCtrl"
          });  
    });
    console.log($scope.input);
  };
 
   $rootScope.$on('ngDialog.closed', function (e, $dialog) {
    $state.reload();
  });
  
   
   /** @ngInject */
  

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
   

   }])

})();


