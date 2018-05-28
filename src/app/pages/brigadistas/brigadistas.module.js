/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brigadistas', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('brigadistas', {
          url: '/brigadistas',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Brigadistas',
          sidebarMeta: {
            icon: 'ion-person-stalker ',
            order: 500,
          },
        }).state('brigadistas.todos', {
          url: '/brigadistasTodos',
          templateUrl: 'app/pages/brigadistas/todos/brigaTodos.html',
          title: 'Todos os registros',
          controller: 'brigaTodosCtrl',
          sidebarMeta: {
            order: 0,
          },
        }).state('brigadistas.cadastro', {
          url: '/brigadistasCadastro',
          templateUrl: 'app/pages/brigadistas/cadastro/brigaCadastro.html',
          title: 'Cadastro',
          controller: 'brigaCadastroCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('brigadistas.unico', {
          url: '/:id',
          templateUrl: 'app/pages/brigadistas/unico/brigaUnico.html',
          title: 'Unico',
          controller: 'brigaUnicoCtrl',
          
        });
    $urlRouterProvider.when('/brigadistas','/brigadistas/brigadistasTodos');
  }

})();
