'use strict';

'use strict';

// Utility Functions
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
  

function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}


function create(element, parent = document) {
  return parent.createElement(element);
}

function log(content) {
  console.log(content);
}

function sleep(duration){
  return new Promise(resolve => {
      setTimeout(resolve, duration);
  });
};

const loadScreen = select('.load-screen');
const loader = select('.loader')
const myMap = select('#map');


mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWUiLCJhIjoiY2xiZ3Jvd2h4MDl5YjN3bW1nNDVmbTc3aiJ9.7a11htvZ_4iZBrcr47Aubw';

        const map = new mapboxgl.Map({
                  container: 'map',
                  style: 'mapbox://styles/mapbox/streets-v12',
                  center: [0, 0],
                  pitch: 40,
                  zoom: 16,
                });

                map.dragPan.disable();
                map.keyboard.disable();
                map.scrollZoom.disable();
                map.doubleClickZoom.disable();
                map.touchZoomRotate.disable();
                
                const marker = new mapboxgl.Marker({
                        color: "#3898ff",
                        draggable: true
                        });

function getLocation(position){
    const { longitude, latitude } = position.coords;
                  
    if (longitude && latitude) {
      map.setCenter([longitude, latitude]);
      marker.setLngLat([longitude, latitude]).addTo(map);
      setTimeout(() => {loadScreen.classList.add('hidden')}, 750)

    };
};

function errorHandler(event) {
  loader.style.animationPlayState = 'paused';
  console.log(event.message);
};

const options = {
  enableHighAccuracy: true,
  maximumAge: 0
}

if (navigator.geolocation) {
  const geo = navigator.geolocation;
  geo.watchPosition(getLocation, errorHandler, options);
}else {
  console.log('Geolocation is not supported by your old browser');
}
