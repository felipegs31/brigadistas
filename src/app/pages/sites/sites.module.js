/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sites', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sites', {
          url: '/sites',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Fazendas',
          sidebarMeta: {
            icon: 'ion-android-pin',
            order: 1000,
          },
        }).state('sites.todos', {
          url: '/sitesTodos',
          templateUrl: 'app/pages/sites/todos/sitesTodos.html',
          title: 'Todos os registros',
          controller: 'sitesTodosCtrl',
          sidebarMeta: {
            order: 0,
          },
        }).state('sites.cadastro', {
          url: '/sitesCadastro',
          templateUrl: 'app/pages/sites/cadastro/sitesCadastro.html',
          title: 'Cadastro',
          controller: 'sitesCadastroCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('sites.unico', {
          url: '/:id',
          templateUrl: 'app/pages/sites/unico/sitesUnico.html',
          title: 'Unico',
          controller: 'sitesUnicoCtrl',
          
        })
        .state('sites.registro', {
          url: '/:id/registro/',
          templateUrl: 'app/pages/sites/analise/sitesAnalise.html',
          title: 'Registro',
          controller: 'sitesAnaliseCtrl',        
        })
        .state('sites.registroEdicao', {
          url: '/:id/registro/:id2',
          templateUrl: 'app/pages/sites/analise/sitesAnaliseEditar.html',
          title: 'Editar',
          controller: 'sitesAnaliseEditarCtrl',        
        })
        .state('sites.timeline', {
          url: '/:id/timeline',
          templateUrl: 'app/pages/sites/timeline/timeline.html',
          title: 'Timeline',
          controller: 'sitesTimelineCtrl',        
        });
    $urlRouterProvider.when('/sites','/sites/sitesTodos');
  }

})();
