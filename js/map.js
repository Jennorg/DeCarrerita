/* Map settings */
let map = L.map('map',{
    attributionControl: false//Removing publicity
}).setView([8.2939207, -62.7310581], 15.5);//Alta Vista Coords

let myAPIKey = "c426551827ac4668a0483ed431439701"; // Get an API Key on https://myprojects.geoapify.com
let mapURL = L.Browser.retina
  ? `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}.png?apiKey={apiKey}`
  : `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}@2x.png?apiKey={apiKey}`;

// Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
L.tileLayer(mapURL, {
  apiKey: myAPIKey,
  mapStyle: "osm-bright-smooth", // More map styles on https://apidocs.geoapify.com/docs/maps/map-tiles/
  maxZoom: 20
}).addTo(map);

let fromMarker;
let toMarker;

// Add Geoapify Address Search control
const addressSearchControl = L.control.addressSearch(myAPIKey, {
  position: 'topleft',
});
// map.addControl(addressSearchControl);

map.zoomControl.remove();
let inputElement = document.getElementsByClassName('location-search');
let inputContainerElement = document.getElementsByClassName('search-box');
// Calling the api

let requestOptions = {
  method: 'GET',
};
  
fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=c426551827ac4668a0483ed431439701", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

function addressAutocomplete(containerElement, id, callback, optionz) {
  const MIN_ADDRESS_LENGTH = 3;
  const DEBOUNCE_DELAY = 300;
  const inputElement = containerElement.querySelector('.location-search')
  let autocompleteItemsElement = document.createElement("datalist");  
  autocompleteItemsElement.setAttribute('id', id)
  let currentTimeout;
  let currentPromiseReject;
  let currentItems;

  function closeDropDownList(autocompleteItemsElement) {
    console.log(autocompleteItemsElement)
    if(autocompleteItemsElement) {
      autocompleteItemsElement.remove();
    }
  }

  if(!optionz) optionz = null;

  inputElement.addEventListener("input", function(e) {
    const currentValue = this.value;

    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    if (currentPromiseReject) {
      currentPromiseReject({
        canceled: true
      });
    }

    if (!currentValue || currentValue.length < MIN_ADDRESS_LENGTH) {
      closeDropDownList(autocompleteItemsElement);
      return false;
    }

    currentTimeout = setTimeout(() => {
        currentTimeout = null;

        const promise = new Promise((resolve, reject) => {
          currentPromiseReject = reject;

          const apiKey = myAPIKey;
          var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&format=json&limit=5&apiKey=${apiKey}`;

          fetch(url)
            .then(response => {
              currentPromiseReject = null;

                if (response.ok) {
                  response.json().then(data => {
                    resolve(data);                 
                  });
                } else {
                  response.json().then(data => {
                    reject(data);                
                  });                  
                }
            });
        });
        
      promise.then((data) => {        
        currentItems = data.results;
        callback(data.results);

        if(!autocompleteItemsElement){
          let autocompleteItemsElement = document.createElement("datalist");  
          autocompleteItemsElement.setAttribute('id', id)
        }
        

        autocompleteItemsElement.className = "container-Sugestions"; // Add the class to the created ul element
        
        data.results.forEach((result, index) => {
          const itemElement = document.createElement("option");
          itemElement.value = result.formatted;
          autocompleteItemsElement.appendChild(itemElement);   
          
          inputElement.addEventListener('input', function() {
            let selectedValue = this.value;
            let dataListOptions = document.getElementById(id).options;
        
            for (const option of dataListOptions) {
              if(id === 'from-List') {
                if(option.value === selectedValue){
                  fromMarker = L.marker([result.lat, result.lon]).addTo(map);
                  map.setView([result.lat, result.lon]);
                  break;
                } 
              }  
              
              if(id === 'to-End-List') {
                if(option.value === selectedValue){
                  toMarker = L.marker([result.lat, result.lon]).addTo(map);
                  map.setView([result.lat, result.lon]);
                  break;
                } 
              }
            }
          });          
        });
      
        // Append the created ul element to the document body or a specific container
        containerElement.appendChild(autocompleteItemsElement);        

      }, (err) => {
        if (!err.canceled) {
          console.log(err);
        }
      });        
    
    document.addEventListener('click', (event)=> {
      const isClickInsideAutocomplete = autocompleteItemsElement.contains(event.target);
      const isClickInsideInput = inputElement.contains(event.target);
      const isClickInsideScrollbar = event.target.clientHeight + event.target.scrollTop < event.target.scrollHeight;
      console.log(event.target);
       
      if (!isClickInsideAutocomplete && !isClickInsideInput && !isClickInsideScrollbar) {
        closeDropDownList(autocompleteItemsElement);
      }
    });
    console.log(currentItems)
    }, DEBOUNCE_DELAY);
  });
}                

let options = [];

addressAutocomplete(inputContainerElement[0], 'from-List',(data) => {
  console.log("Selected option: ");
  console.log(data);
  options.push(data);  
},);

addressAutocomplete(inputContainerElement[1], 'to-End-List',(data) => {
  console.log("Selected option: ");
  console.log(data);
  options.push(data);
}, {
  placeholder: "Enter an address here"
});


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
let whereToForm = document.getElementById('whereToForm');

addTravelButton.addEventListener('click', ()=>{
    whereToForm.classList.toggle('whereToForm')
    whereToForm.classList.toggle('goUp');
})

let continueButton = document.getElementById('continue');

continueButton.addEventListener('click', (event)=>{
  event.preventDefault();
    if(fromMarker && toMarker){
      L.Routing.control({
        waypoints: [
          L.latLng(fromMarker.getLatLng()),
          L.latLng(toMarker.getLatLng())
        ]
      }).addTo(map);

      whereToForm.classList.toggle('whereToForm')
      whereToForm.classList.toggle('goUp');
    }
})