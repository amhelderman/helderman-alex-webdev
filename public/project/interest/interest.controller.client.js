(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("interestController", interestController)

    function interestController($scope, $document, $routeParams, $window, $location,
                                interestService, profileService, userService){
        var model = this;

        model.message = "Enter an interest!";

        var userId = $routeParams['userId'];
        model.interest = "pizza";
        model.interests = [{label: "pizza"}, {label: "pie"}];
        $window.model = model;

        function init(){
            console.log("interestController.")
            model.interest.users = [userId];

            interestService.interestTest();

            // interestService.getInterestsByUser(userId)
            //     .then(function (interests){
            //         console.log(["Received these interests:", intersests]);
            //         model.interests = interests;
            //     })
        }
        init();

        model.submitInterest = function(){

            //connect to API to get interests
            interestService.submitInterest(model.interest)
                .then(function (response){
                    var interests = response.data["@graph"];
                    console.log(["submitInterest...", interests]);

                    model.interests = [];
                    for (var i in interests){
                        var currentInterest = interests[i];

                        // The interest must be defined and not in list already.
                        console.log(["Pushing ", currentInterest.label, (model.interests.indexOf(currentInterest.label) === -1)]);
                        if((currentInterest.label) &&
                            (model.interests.indexOf(currentInterest.label) === -1)){
                            model.interests.push(currentInterest.label);
                        }
                    }

                    console.log(model.interests)
                })
        };

        model.interestTest = function(){

            //connect to API to get interests
            interestService.submitInterest(model.interest)
                .then(function (response){
                    var interests = response.data["@graph"];
                    console.log(["submitInterest...", interests]);

                    model.interests = [];
                    for (var i in interests){
                        var currentInterest = interests[i];

                        // The interest must be defined and not in list already.
                        console.log(["Pushing ", currentInterest.label, (model.interests.indexOf(currentInterest.label) === -1)]);
                        if((currentInterest.label) &&
                            (model.interests.indexOf(currentInterest.label) === -1)){
                            model.interests.push(currentInterest.label);
                        }
                    }

                    console.log(model.interests)
                })
        };

        model.removeInterest = function(){

            //connect to API to get interests
            interestService.removeInterest(model.interest)
                .then(function (response){
                    console.log(["removeInterest...", response]);
                })
        };

    }

})();





