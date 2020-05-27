let markers = [];
let map;
let infoWindow;

initMap = () => {
  var brussels = {lat: 49.8153, lng: 6.1296};
  infoWindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    center: brussels,
    zoom: 9,
    styles: [
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.station.airport",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      }
    ]
  });
  createMarkers();
  displayLocations();
}

displayLocations = () => {
  var locationsHTML = "";
  locations.filter( ({type}) => type.includes("Airport"))
    .forEach( location => {
    const {name, city, country, code, woeid} = location;
    locationsHTML += `        
    <div class="location">
      <div class="text-info">
        <span class="name">${name}</span>
        <span class="address">${city}, ${country}</span>
        <span class="woeid">${woeid}</span>
      </div>
      <div class="code">${code}</div>
    </div>`
  })
  document.querySelector('.locations').innerHTML = locationsHTML;
}

createMarkers = () => {
  locations.filter( ({type}) => type.includes("Airport")).map((location) => {
    let {lat, lon, name, city, country} = location;
    let position = {
      lat: parseFloat(lat), 
      lng: parseFloat(lon)
    };
    createMarker(position, name, city + ", " + country);
  });
} 

createMarker = (position, name, address) => {
  var html = `<b>${name}</b> <br/>${address}`;
  var marker = new google.maps.Marker({map, position});
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}