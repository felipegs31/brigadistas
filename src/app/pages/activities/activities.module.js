/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.activities', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('activities', {
          url: '/activities',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Atividades',
          sidebarMeta: {
            icon: 'ion-settings',
            order: 600,
          },
        }).state('activities.todos', {
          url: '/ativitiesTodos',
          templateUrl: 'app/pages/activities/todos/activitiesTodos.html',
          title: 'Todos os registros',
          controller: 'activitiesTodosCtrl',
          sidebarMeta: {
            order: 0,
          },
        }).state('activities.cadastro', {
          url: '/activitiesCadastro',
          templateUrl: 'app/pages/activities/cadastro/activitiesCadastro.html',
          title: 'Cadastro',
          controller: 'activitiesCadastroCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('activities.unico', {
          url: '/:id',
          templateUrl: 'app/pages/activities/unico/activitiesUnico.html',
          title: 'Unico',
          controller: 'activitiesUnicoCtrl',
          
        });
    $urlRouterProvider.when('/brigadistas','/brigadistas/brigadistasTodos');
  }

})();
