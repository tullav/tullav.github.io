(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$http']
function MenuDataService($q, $http) {
  var service = this;

  service.getAllCategories = function () {

    var deferred = $q.defer();
    
    var promise = $http({ method: "GET", url: 'https://davids-restaurant.herokuapp.com/categories.json' });

    promise.then(function (response) {
        
        var categories = response.data;

        deferred.resolve(categories);

    });

    return deferred.promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    
    var deferred = $q.defer();
    
    var promise = $http({ method: "GET", url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName });

    promise.then(function (response) {
        
        var items = response.data.menu_items;

        deferred.resolve(items);

    });

    return deferred.promise;

  };
}

})();