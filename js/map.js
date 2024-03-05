/* Map settings */
const key = "7LJaKxT8w92j3CsVdTuo";
const map = L.map('map',{
    attributionControl: false//Removing publicity
}).setView([8.2939207, -62.7310581], 15.5);//Alta Vista Coords

L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    maxZoom: 19,    
    crossOrigin: true
}).addTo(map);

L.control.maptilerGeocoding({ apikey: key}).addTo(map);

map.zoomControl.remove();

/* buttons settings */

let centerMapButton = document.getElementById('location');

centerMapButton.addEventListener('click', ()=>{
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            map.setView([latitude, longitude], 18);
        });
    } else {
        alert('La geolocalización no es compatible con este navegador.');
    }
});

let addTravelButton = document.getElementById('add');
let whereToForm = document.querySelector('.whereToForm');

addTravelButton.addEventListener('click', ()=>{
    whereToForm.classList.toggle('whereToForm')
    whereToForm.classList.toggle('goUp');
})