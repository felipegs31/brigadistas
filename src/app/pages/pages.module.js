/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.brigadistas',
    'BlurAdmin.pages.maquinas',
    'BlurAdmin.pages.activities',
    'BlurAdmin.pages.rounds',
    'BlurAdmin.pages.sites',
    'BlurAdmin.pages.confirmacoes',
    'BlurAdmin.pages.comunidades',
    'BlurAdmin.pages.login',
    'BlurAdmin.pages.register'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

  }

})();
