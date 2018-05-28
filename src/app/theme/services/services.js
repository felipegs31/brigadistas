(function () {
  'use strict';

angular.module('BlurAdmin.theme')

.constant("baseURL", "http://localhost:8090/")


.factory('brigadistaFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource("http://localhost:8090/brigadistas/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

.factory('maquinaFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource("http://localhost:8090/machines/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

.factory('activitiesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource("http://localhost:8090/activities/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

.factory('sitesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource("http://localhost:8090/sites/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

.factory('comunitiesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource( "http://localhost:8090/comunities/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

.factory('roundsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource("http://localhost:8090/rounds/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

.factory('atividadesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource("http://localhost:8090/brigadistas/:brigadistaId/activities/:activitieId", {brigadistaId:"@brigadistaId", activitieId: "@activitieId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('registroFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource("http://localhost:8090/sites/:siteId/registro/:registroId", {siteId:"@siteId", registroId: "@registroId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('fecharRoundFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
        return $resource("http://localhost:8090/rounds/:id/fecharround", null, {
            'update': {
                method: 'PUT'
            }
        });
}])

// .factory('addActivitieFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        
//         return $resource("brigadistas/activities", null, {
//             'update': {
//                 method: 'PUT'
//             }
//         });
// }])



})();
