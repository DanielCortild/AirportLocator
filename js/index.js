let markers = [];
let map;
let infoWindow;
let image;

initMap = () => {
  var brussels = {lat: 49.8153, lng: 6.1296};
  infoWindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    center: brussels,
    zoom: 9,
    styles
  });
  createMarkers();
  displayLocations();
}

displayLocations = () => {
  var locationsHTML = "";
  locations.filter( ({type}) => type.includes("Airport")).forEach( location => {
    const {name, city, country, code, woeid} = location;
    locationsHTML += `        
    <div class="location">
      <div class="text-info">
        <span class="name">${name}</span>
        <span class="address">${city}, ${country}</span>
      </div>
      <div class="code">${code}</div>
    </div><hr>`
  })
  document.querySelector('.locations').innerHTML = locationsHTML;
}

createMarkers = () => {
  locations.filter( ({type}) => type.includes("Airport")).map((location) => {
    createAirportMarker(location);
  });
} 

createAirportMarker = ({name, code, city, country, lat, lon, woeid}) => {
  var html = `
  <div class="infoBox">
    <span><b>${name + " (" + code + ")" }</b></span>
    <hr>
    <span>
      <i class="fas fa-compass"></i>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}" target="_blank">${" " + city + ", " + country}</a>
    </span>
    <span class="woeid"><i class="fas fa-hashtag"></i>${woeid}</span>
  </div>`;
  let position = {
    lat: parseFloat(lat), 
    lng: parseFloat(lon)
  };
  var marker = new google.maps.Marker({
    map, 
    position, 
    icon: 'assets/airport.png'
  });
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}