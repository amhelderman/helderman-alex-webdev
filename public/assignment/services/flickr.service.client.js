(function(){
    angular
        .module("WamApp")
        .service("FlickrService", FlickrService);

    function FlickrService($http)
    {
        this.searchPhotos = searchPhotos;

        function searchPhotos(query){
            console.log("FlickrService searching photos.");
        }


    }
})();