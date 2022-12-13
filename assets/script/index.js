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
const myMap = select('#map');


mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWUiLCJhIjoiY2xiZ3Jvd2h4MDl5YjN3bW1nNDVmbTc3aiJ9.7a11htvZ_4iZBrcr47Aubw';

function getLocation(position){
        const { longitude, latitude } = position.coords;

        const map = new mapboxgl.Map({
                container: 'map',
                center: [longitude, latitude],
                style: 'mapbox://styles/mapbox/streets-v12',
                zoom: 17
                });
                
                const marker = new mapboxgl.Marker({
                        color: "#89CFF5 ",
                        draggable: true
                        }).setLngLat([longitude, latitude])
                        .addTo(map);
};

function errorHandler(error) {
        console.log(error.message);
};

const options = {
        enableHighAccuracy: true,
        showUserLocation: true
};


if (navigator.geolocation) {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(getLocation, errorHandler, options);
        sleep(5000).then(() => myMap.classList.remove('hidden'))

}else {
        console.log('Geolocation is not supported by your old browser');
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);



window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}); 