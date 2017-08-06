/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("mapService", mapService);

    function mapService($window, $q, $http) {
        this.findUserByUsernameAndPassword = findUserByUsernameAndPassword;

        function loadScript() {
            console.log('loadScript')
            // use global document since Angular's $document is weak
            var s = document.createElement('script')
            s.src = '//maps.googleapis.com/maps/api/js?sensor=false&language=en&callback=initMap'
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

app.service('lazyLoadApi', );