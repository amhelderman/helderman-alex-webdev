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

        this.init = init;
        this.initMapAtPosition = initMapAtPosition;
        this.addStreetView = addStreetView;
        this.getNearbyUsers = getNearbyUsers;
        this.addMarkerToMap = addMarkerToMap;

        var deferred = $q.defer();
        function init(){

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

        function loadScript() {
            console.log('loadScript')
            // var s = document.createElement('script')
            // s.src = '//maps.googleapis.com/maps/api/js?key='
            //     +process.env.GOOGLE_API_KEY+"&callback=initMap';
            // document.body.appendChild(s)
        }

        var clickCallback = null;
        var dblclickCallback = null;
        function initMapAtPosition(mapDiv, myLatLng, pclickCallback, pdblclickCallback, mapClickCallback) {
            console.log(myLatLng);
            clickCallback = pclickCallback;
            dblclickCallback = pdblclickCallback;
            map = new google.maps.Map(
                mapDiv, {
                    center: myLatLng,
                    zoom: 14,
                    styles: myStyles
                });
            google.maps.event.addListener(map, 'click', mapClickCallback);
        }

        function addStreetView(){
            // var fenway = {lat: 42.345573, lng: -71.098326};
            // var panorama = new google.maps.StreetViewPanorama(
            //     document.getElementById('pano'), {
            //         position: fenway,
            //         pov: {
            //             heading: 34,
            //             pitch: 10
            //         }
            //     });
            // map.setStreetView(panorama);
        }

        function getNearbyUsers(){
            console.log("mapController - client - getNearbyUsers");
            profileService.getLocations(model.mapPosition)
                .then(function(response){
                    model.profiles = response.data;
                    return model.profiles;
                });
        }


        function addMarkerToMap(profile){
            var myLatLng = {lat: profile.lat+randomOffset(),
                lng: profile.lng+randomOffset()};

            //Create the marker.
            circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 0,
                fillColor: '#c7eeff',
                fillOpacity: 0.35,
                center: myLatLng,
                map: map,
                radius: 200
            });

            marker = new google.maps.Marker({
                icon: '/userIcon.png',
                position: myLatLng,
                map: map
            });

            google.maps.event.addListener(marker, 'click', clickCallback);
            google.maps.event.addListener(marker, 'dblclick',dblclickCallback );
        }
    } // end mapService

    function randomOffset(){
        return 0.002*((new Date().getSeconds()*Math.random())%1)-0.01;
    }

    var myStyles = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ];
})();
