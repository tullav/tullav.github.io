(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ServicePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundList.html',
        scope: {
            found: '<',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };

    return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

    var list = this;

    list.searchTerm = "";
    list.items = [];
    
    list.search = function () {
        var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
        promise.then(function (response) {
            list.items = response;
        });
    };

    list.removeItem = function (index) {
        list.items.splice(index, 1);
    };
}

MenuSearchService.$inject = ['$q', '$http', 'ServicePath'];
function MenuSearchService($q, $http, ServicePath) {
  
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var deferred = $q.defer();

    var promise = $http({ method: "GET", url: ServicePath });

    promise.then(function (response) {
        
        var foundItems = [];
        var allItems = response.data.menu_items;

        for (var i = 0; i < allItems.length; i++) {
            if (allItems[i].description.indexOf(searchTerm) !== -1) {
                foundItems.push(allItems[i]);
            }
        }

        deferred.resolve(foundItems);

    });

    return deferred.promise;

  };

}

})();