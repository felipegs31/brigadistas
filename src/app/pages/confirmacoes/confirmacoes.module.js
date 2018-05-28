(function () {
  'use strict';

  angular.module('BlurAdmin.pages.confirmacoes', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('confirmacoes', {
          url: '/confirmacoes',
          templateUrl: 'app/pages/confirmacoes/confirmacoes.html',
          title: 'Confirmacoes',
        });
  }

})();