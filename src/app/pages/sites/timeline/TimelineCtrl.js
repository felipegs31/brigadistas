/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.compras')
      .controller('comprasTimelineCtrl', ['$scope',
        function($scope){

          function sortFunction(a,b){  
              var dateA = new Date(a.dt).getTime();
              var dateB = new Date(b.dt).getTime();
              return dateA < dateB ? 1 : -1;  
          }; 
          
          $scope.smartTablePageSize = 10;

          $scope.carregado = false;
          sitesFactory.get({id: $stateParams.id})
        .$promise.then(
            function (response) {
              $scope.roteamento = response;
              $scope.timelineInput = response.analysis;
             // $scope.timelineInput.sort(function(a,b){return a.getTime() - b.getTime()});
              $scope.timelineInput.dt = new Date($scope.timelineInput.dt); 
              $scope.timelineInput.sort(sortFunction)

           //   console.log(response);
              

            
              $scope.carregado = true;
             
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
  


        var timelineBlocks = $('.cd-timeline-block'), offset = 0.8;

        //hide timeline blocks which are outside the viewport
        hideBlocks(timelineBlocks, offset);

        //on scolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function () {
          if (!window.requestAnimationFrame) {
            setTimeout(function () {
              showBlocks(timelineBlocks, offset);
            }, 100);
          } else {
            window.requestAnimationFrame(function () {
              showBlocks(timelineBlocks, offset);
            });
          }
        });
       
        function hideBlocks(blocks, offset) {
          blocks.each(function () {
            ( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
          });
        }

        function showBlocks(blocks, offset) {
          blocks.each(function () {
            ( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
          });
        }
      
  }])

})();