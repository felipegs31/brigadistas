/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rounds', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('rounds', {
          url: '/rounds',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Rounds',
          sidebarMeta: {
            icon: 'ion-clock',
            order: 400,
          },
        }).state('rounds.todos', {
          url: '/roundsTodos',
          templateUrl: 'app/pages/rounds/todos/roundsTodos.html',
          title: 'Todos os registros',
          controller: 'roundsTodosCtrl',
          sidebarMeta: {
            order: 0,
          },
        }).state('rounds.cadastro', {
          url: '/roundsCadastro',
          templateUrl: 'app/pages/rounds/cadastro/roundsCadastro.html',
          title: 'Cadastro',
          controller: 'roundsCadastroCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('rounds.unico', {
          url: '/:id',
          templateUrl: 'app/pages/rounds/unico/roundsUnico.html',
          title: 'Unico',
          controller: 'roundsUnicoCtrl',
          
        });
    $urlRouterProvider.when('/rounds','/rounds/roundsTodos');
  }

})();
