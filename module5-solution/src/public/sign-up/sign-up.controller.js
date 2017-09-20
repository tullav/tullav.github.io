(function () {
"use strict";

angular.module('public')
.controller('SignUpFormController', SignUpFormController)
.service('MenuService', MenuService)
.service('ProfileService', ProfileService);

SignUpFormController.$inject = ['MenuService', 'ProfileService']
function SignUpFormController(MenuService, ProfileService) {
    var reg = this;
    reg.is_submitted = false;
    reg.is_favorite_valid = false;

    reg.submit = function () {

        var promise = MenuService.getMenuItems();
        promise.then(function (response) {
            reg.is_favorite_valid = false;
            var valid_items = response.menu_items;
            for(var i = 0; i < valid_items.length; i++) {
                if (valid_items[i].short_name === reg.user.favorite) {
                    reg.is_favorite_valid = true;
                    ProfileService.setProfile(reg.user.firstName, reg.user.lastName, reg.user.email, reg.user.phone,
                                                valid_items[i].short_name, valid_items[i].name, valid_items[i].description);
                }
            }

            reg.is_submitted = true;

        });
    };
}

MenuService.$inject = ['$http'];
function MenuService($http) {
  var service = this;

  service.getMenuItems = function () {
    return $http.get('https://fierce-taiga-10296.herokuapp.com/menu_items.json').then(function (response) {
      return response.data;
    });
  };
}

function ProfileService() {
    var service = this;

    var profile = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        short_name: '',
        title: '',
        description: '',
        image: ''
    }

    service.setProfile = function (firstName, lastName, email, phone, short_name, title, description) {
        console.log(short_name);
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.email = email;
        profile.phone = phone;
        profile.short_name = short_name;
        profile.title = title;
        profile.description = description;
        profile.image = "https://fierce-taiga-10296.herokuapp.com/images/" + short_name + ".jpg"
    };

    service.getProfile = function () {
        return profile;
    };
}


})();