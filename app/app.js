'use strict';

angular.module('templates',[]);
angular.module('CurrencyApp.controllers',[]);
angular.module('CurrencyApp.services',[]);

angular.module('CurrencyApp',[
    'ngRoute',
    'CurrencyApp.controllers',
    'CurrencyApp.services',
    'templates'
])

.config(['$routeProvider',function($routeProvider) {
   
    $routeProvider
    .when('/fx_money', {
            title: 'Send or Receive Money',     
            controller: 'CurrencyMoneyController',
            templateUrl: 'app/templates/fx_money.html',
            pageid: 'fxmoney'
    })
     .when('/', {
       title: 'Send or Receive Money',     
            controller: 'CurrencyMoneyController',
            templateUrl: 'app/templates/fx_money.html',
            pageid: 'fxmoney'
    })      
    .otherwise({
        redirectTo: '/'
    });

  }])

.run(['$location', '$rootScope', function($location, $rootScope) {  

}]);
	
