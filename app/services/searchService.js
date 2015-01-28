/* @flow */
angular.module('TruckMuncherApp')
	.factory('SearchService', ['httpHelperService', function(httpHelperService: IHttpHelperService) {
		var service: ISearchService = {
			simpleSearch: function(query, limit, offset) {
				var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.search.SearchService/simpleSearch';
				return httpHelperService.post(url, {
					query: query,
					limit: limit,
					offset: offset
				}, 'searchResponse');
			}
		};

		return service;
	}]);