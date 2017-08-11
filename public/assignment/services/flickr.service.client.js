(function(){
    angular
        .module("WamApp")
        .service("FlickrService", FlickrService);

    function FlickrService($http)
    {
        this.searchPhotos = searchPhotos;

        var FLICKR_API_KEY = "d767886c17376df5d19e73e339ed445b";
        var secret = "9ecf9e9a9bc84f35";
        var urlBase ="https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key="
        +FLICKR_API_KEY+"&text=";

        function searchPhotos(query){
            console.log("FlickrService searching photos.");
            var urll = urlBase + query;
            return $http.get(urll).then(
                function (response){
                    console.log("FLICKR responded!");
                    console.log(response.data);
                    return response;

                }
            )
        }


    }
})();