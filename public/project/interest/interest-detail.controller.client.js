(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("interestDetailController", interestDetailController)

    function interestDetailController($scope, $location, $document, $routeParams, $window, $location,
                                interestService, profileService, userService){
        var model = this;

        var label = $routeParams.interestLabel;
        model.label = label;


        function init(){
            console.log("interestDetailController.")
            console.log("finding interest based on label "+label)
            userService.checkLogin()
                .then(function (response){
                    console.log(["Account controller got user.", response.data]);
                    model.user = response.data;
                });
            interestService.getInterestByLabel(label)
                .then(function(interest){
                    console.log(["Got interest ",interest]);
                    if((!interest) || (interest.data==="0")){
                        model.message = "Interest '"+label+ "' not found.";
                    } else{
                        model.interest = interest;
                    }
                })
        }
        init();

        model.searchInterest = function(){
            $location.url("/interest-detail/"+model.inputLabel)
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





