(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("interestController", interestController)

    function interestController($document, $routeParams, $window, $location,
                                interestService, profileService, userService){
        var model = this;

        model.message = "Enter an interest!";

        var userId = $routeParams['userId'];
        model.interest = "pizza";

        $window.model = model;

        function init(){
            console.log("interestController.")
            model.interest.users = [userId];
            interestService.getInterestsByUser(userId)
                .then(function (interests){
                    console.log(["Received these interests:", intersests]);
                    model.interests = interests;
                })
        }
        init();

        model.submitInterest = function(){

            //connect to API to get interests
            interestService.submitInterest(model.interest)
                .then(function (response){
                    console.log(["submitInterest...", response]);
                })
        }

        model.removeInterest = function(){

            //connect to API to get interests
            interestService.removeInterest(model.interest)
                .then(function (response){
                    console.log(["removeInterest...", response]);
                })
        }

    }

})();





