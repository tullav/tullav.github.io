(function () {
"use strict";

angular.module('public')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['ProfileService']
function ProfileController (ProfileService) {
    var profile = this;

    profile.data = ProfileService.getProfile();
    
    console.log(profile);
}

})();