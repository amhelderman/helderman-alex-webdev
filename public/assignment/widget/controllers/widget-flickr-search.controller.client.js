(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;


        model.photos = [];
        model.searchPhotos = function(searchTerm) {
            console.log("Search Photos:");
            console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        };

        model.selectPhotos = function(photo){
            console.log("selectPhotos");
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.message = "Selected photo "+photo.id;
            WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then(function(status){
                    console.log("finished selecting");
                    console.log(status);
                });
        };

        function init()
        {
            console.log("FlickrImageSearchController init.");

        }
        init();
    };
})();





