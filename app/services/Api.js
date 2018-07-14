'use strict';

angular.module('CurrencyApp.services').factory('CurrencyAPIservice',
		[ '$rootScope', '$route', '$location', '$http', '$q', function($rootScope, $route, $location, $http, $q) {

			var CurrencyAPI = {};

			CurrencyAPI.ajaxGetRequest = function(url) {
				var deferred = $q.defer();
				//   var url = getUrl; 

				$http({
					method : 'GET',
					url : url,
					header : {
						'Access-Control-Allow-Headers' : 'x-requested-with'
					}
				}).success(function(response) {
					deferred.resolve(response);
				}).error(function() {
					deferred.reject('There was an errorin ajax call');
				});
				return deferred.promise;
			};

			// Getting the currencies using service
			CurrencyAPI.getCurrencySymbols = function(sucessCallBack, errorCallBack) {

				this.ajaxGetRequest('assets/data/currency.json')
				//this.ajaxGetRequest('http://country.io/currency.json')

				.then(function(response) {
					sucessCallBack(response);
				}, function(err) {
					console.log("Error occurred :" + err);
				});

			};

			// Getting Countries from Json data
			CurrencyAPI.getCountyList = function(sucessCallBack, errorCallBack) {
				//this.ajaxGetRequest('http://data.fixer.io/api/latest ? access_key = "cb4d7fac887be2cdfe0ef4a88940b452"')
				this.ajaxGetRequest('assets/data/country.json').then(function(response) {
					sucessCallBack(response);
				}, function(err) {
					console.log("Error occurred :" + err);
				});

			};

			return CurrencyAPI;
		} ]);
