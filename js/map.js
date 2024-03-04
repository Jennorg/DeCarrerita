let map = L.map('map',{
    attributionControl: false//Removing publicity
}).setView([8.2939207, -62.7310581], 15.5);//Alta Vista Coords

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,    
}).addTo(map);

map.zoomControl.remove();