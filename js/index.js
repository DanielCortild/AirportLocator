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
  searchLocations();
}

displayLocations = (locations) => {
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
  $('.locations').html(locationsHTML);
}

searchLocations = () => {
  var search = document.getElementById('input').value.toLowerCase();
  let foundLocations;
  if(search) {
    foundLocations = locations.filter(({name, city, state, country, code}) =>
      ( name ? name.toLowerCase().includes(search) : true ||
        city ? city.toLowerCase().includes(search) : true ||
        state ? state.toLowerCase().includes(search) : true ||
        country ? country.toLowerCase().includes(search) : true ||
        code ? code.toLowerCase().includes(search) : true )
    );
  } else {
    foundLocations = locations;
  }

  clearMarkers();
  displayLocations(foundLocations);
  createMarkers(foundLocations);
  setOnClickListener();
}

setOnClickListener = () => {
  document.querySelectorAll('.location').forEach((location, index) => {
    location.addEventListener('click', () => {
      google.maps.event.trigger(markers[index], 'click');
    });
  });
}

createMarkers = (locations) => {
  locations.filter( ({type}) => type.includes("Airport")).map((location) => {
    createAirportMarker(location);
  });
}

clearMarkers = () => {
  infoWindow.close();
  markers.forEach(marker => {
    marker.setMap(null);
  })
  markers = [];
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
    <span class="woeid"><i class="fas fa-hashtag"></i>${" " + woeid}</span>
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
    map.panTo(position);
  });
  markers.push(marker);
}
