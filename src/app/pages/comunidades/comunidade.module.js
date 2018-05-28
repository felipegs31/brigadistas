/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.comunidades', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('comunidades', {
          url: '/comunidades',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'comunidades',
          sidebarMeta: {
            icon: 'ion-android-pin',
            order: 1000,
          },
        }).state('comunidades.comunidades', {
          url: '/comunidadesTodos',
          templateUrl: 'app/pages/comunidades/todos/comunidadesTodos.html',
          title: 'Todos os registros',
          controller: 'comunidadesTodosCtrl',
          sidebarMeta: {
            order: 0,
          },
        }).state('comunidades.cadastro', {
          url: '/comunidadesCadastro',
          templateUrl: 'app/pages/comunidades/cadastro/comunidadesCadastro.html',
          title: 'Cadastro',
          controller: 'comunidadesCadastroCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('comunidades.unico', {
          url: '/:id',
          templateUrl: 'app/pages/comunidades/unico/comunidadesUnico.html',
          title: 'Unico',
          controller: 'comunidadesUnicoCtrl',
          
        });
    $urlRouterProvider.when('/comunidades','/comunidades/comunidadesTodos');
  }

})();
