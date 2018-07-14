'use strict';

angular.module('CurrencyApp.controllers').

controller(
		'CurrencyMoneyController',
		[ 'CurrencyAPIservice', '$timeout', '$rootScope', '$scope', '$location',
				function(CurrencyAPIservice, $timeout, $rootScope, $scope, $location) {

					$scope.exrate = "2";
					$scope.sendCurrency = "";
					$scope.receiveCurrency = "";

					$scope.sendamtInvalid = false;
					$scope.recAmtInvalid = false;

					// change sender amount event
					$scope.calucaletRecAmount = function() {

						$scope.sendamtInvalid = false;
						$scope.recAmtInvalid = false;

						// validate amount
						if (!$scope.sendamt) {
							$scope.sendamtInvalid = true;
							$scope.sendamt = "";
							$scope.recvamt = "";
							return;
						}

						// set default currency
						if ($scope.sendCurrency == $scope.receiveCurrency)
							$scope.exrate = "1";
						else
							$scope.exrate = "2";

						if ($scope.selecectedsender && $scope.selecectedreceiver) {
							if ($scope.sendamt) {
								$scope.recvamt = parseFloat(($scope.sendamt * $scope.exrate).toFixed(2));
							}
						}
						if ($scope.sendamt)
							$scope.sendamt = parseFloat($scope.sendamt.toFixed(2));
					}

					// change receiver amount event
					$scope.calucaletSenderAmount = function() {
						// validate receive amount
						$scope.sendamtInvalid = false;
						$scope.recAmtInvalid = false;

						// validate amount
						if (!$scope.recvamt) {
							$scope.recAmtInvalid = true;
							$scope.sendamt = "";
							$scope.recvamt = "";
							return;
						}

						if ($scope.sendCurrency == $scope.receiveCurrency)
							$scope.exrate = "1";
						else
							$scope.exrate = "2";
						if ($scope.selecectedsender && $scope.selecectedreceiver) {
							if ($scope.recvamt) {
								// $scope.sendamt = Math.round($scope.recvamt / $scope.exrate);
								$scope.sendamt = parseFloat(($scope.recvamt / $scope.exrate).toFixed(2));
								$scope.recvamt = parseFloat($scope.recvamt.toFixed(2));
							}
						}
						if ($scope.recvamt)
							$scope.recvamt = parseFloat($scope.recvamt.toFixed(2));
					}

					// change sender country event
					$scope.changeSenderCountry = function() {

						if ($scope.selecectedsender && $scope.selecectedsender != "From Country") {
							for ( var countrycode in $scope.CurrencyList) {
								if ($scope.selecectedsender == countrycode) {
									$scope.sendCurrency = $scope.CurrencyList[countrycode];
									break;
								}
							}

						} else
							$scope.sendCurrency = "USD";
						if ($scope.sendamt)
							$scope.calucaletRecAmount();
						if ($scope.recvamt)
							$scope.calucaletSenderAmount();
					}

					// change receiver country event
					$scope.changeReceiverCountry = function() {

						if ($scope.selecectedreceiver && $scope.selecectedreceiver != "From Country") {
							for ( var countrycode in $scope.CurrencyList) {
								if ($scope.selecectedreceiver == countrycode) {
									$scope.receiveCurrency = $scope.CurrencyList[countrycode];
									break;
								}
							}

						} else
							$scope.receiveCurrency = "USD";
						if ($scope.sendamt)
							$scope.calucaletRecAmount();
						if ($scope.recvamt)
							$scope.calucaletSenderAmount();
					}

					// Get Country list using API
					CurrencyAPIservice.getCountyList(function(response) {
						if (!response.error) {
							$scope.countryList = response;
						}

					});

					// Get the currency symbols for country
					CurrencyAPIservice.getCurrencySymbols(function(response) {
						if (!response.error) {
							$scope.CurrencyList = response;
						}

					});

				} ]);