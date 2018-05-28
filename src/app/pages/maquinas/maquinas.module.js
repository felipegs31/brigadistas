/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.maquinas', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('maquinas', {
          url: '/maquinas',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Máquinas',
        //  sidebarMeta: {
         //   icon: 'ion-android-boat',
         //   order: 1100,
         // },
        }).state('maquinas.todos', {
          url: '/maquinasTodos',
          templateUrl: 'app/pages/maquinas/todos/maquiTodos.html',
          title: 'Todos os registros',
          controller: 'maquiTodosCtrl',
          sidebarMeta: {
            order: 0,
          },
        }).state('maquinas.cadastro', {
          url: '/maquinasCadastro',
          templateUrl: 'app/pages/maquinas/cadastro/maquiCadastro.html',
          title: 'Cadastro',
          controller: 'maquiCadastroCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('maquinas.unico', {
          url: '/:id',
          templateUrl: 'app/pages/maquinas/unico/maquiUnico.html',
          title: 'Unico',
          controller: 'maquiUnicoCtrl',
        }).state('maquinas.manutencaoadd', {
          url: '/maquinasManutencaoAdd/:id',
          templateUrl: 'app/pages/maquinas/manutencao/maquiManuAdd.html',
          title: 'Manutenção',
          controller: 'maquiManutencaoAddCtrl',
        }).state('maquinas.manutencaoedit', {
          url: '/maquinasManutencaoEdit/:id',
          templateUrl: 'app/pages/maquinas/manutencao/maquiManuEdit.html',
          title: 'Manutenção',
          controller: 'maquiManutencaoEditCtrl',
        });
    $urlRouterProvider.when('/maquinas','/maquinas/maquinasTodos');
  }

})();
