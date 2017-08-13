(function(){
    angular
        .module("WamApp")
        .service("mapService", mapService);

    // Source for lazy loading map service from:
    // http://plnkr.co/edit/1NpquJ?p=preview
    // and mentioned :
    // https://stackoverflow.com/questions/24246403/angularjs-load-google-map-script-async-in-directive-for-multiple-maps
    // It is simply lazy-loading the google api script.
    // This is necessary because the <script> used to async load in html would not work
    function mapService($window, $q, $http) {
        function loadScript() {
            console.log('loadScript')
            // use global document since Angular's $document is weak
            var s = document.createElement('script')
            //https://maps.googleapis.com/maps/api/js?key=AIzaSyApxo8W1f-xebWiMEjYMyphOI5eUHxu8pg&callback=initMap
            s.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyApxo8W1f-xebWiMEjYMyphOI5eUHxu8pg&callback=initMap'
            document.body.appendChild(s)
        }

        var deferred = $q.defer();

        $window.initMap = function () {
            deferred.resolve()
        };

        if ($window.attachEvent) {
            $window.attachEvent('onload', loadScript)
        } else {
            $window.addEventListener('load', loadScript, false)
        }

        return deferred.promise;
    }
})();
