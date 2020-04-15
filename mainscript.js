// kaart opvragen met mapbox API
mapboxgl.accessToken = 'pk.eyJ1IjoiamVybmV5IiwiYSI6ImNrOGx2MXl4NDA2bWszZ255azNqdjltdHUifQ.U-PG4QQnheji1-y_zQqBaw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jerney/ck8z0hbuw06ua1intj4ca1vcs',
  center: [14.062500, 46.038643],
  zoom: 1
});

// resizen van de kaart
var mapDiv = document.getElementById('map');
if (mapDiv.style.visibility === true) map.resize();

//Zoom knoppen & bearing (linksboven)
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left')

// markers coordinaten resorts, titel, land & city id
var resorts = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [100.076893, 20.373008]
    },
    properties: {
      title: 'Four Seasons Golden Triangle',
      country: 'Thailand',
      cityId: 1153669
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [72.727759, 3.884550]
    },
    properties: {
      title: 'Constance Moofushi',
      country: 'Maldives',
      cityId: 1282028
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-149.595903, -17.022765]
    },
    properties: {
      title: 'The Brando',
      country: 'Tahiti',
      cityId: 4034636
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-83.865620, 35.686115]
    },
    properties: {
      title: 'Blackberry Farm',
      country: 'United States',
      cityId: 4662168
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [9.842042, 46.499242]
    },
    properties: {
      title: 'Kulm Hotel St. Moritz',
      country: 'Switzerland',
      cityId: 2658813
    }
  }]
};

// markers toevoegen aan de kaart
resorts.features.forEach(function(marker){
	var element = document.createElement('div');
	element.className = 'marker';

	new mapboxgl.Marker(element)
	.setLngLat(marker.geometry.coordinates)
	//popup toevoegen aan de markers
	.setPopup(new mapboxgl.Popup({offset: 25})
		.setHTML('<h3 class="popuptitle">' + marker.properties.title + '</h3><p class="popupcountry">' + marker.properties.country + '</p>'))
	.addTo(map);
});


//OpenWeathermap API 
function weatherBox(cityID){
  var Apikey = '44689270c14a373a0d2529c4958dafff';
  //Volgorde cityId's: 
  // 2658813
  // 1153669
  // 1282028
  // 4034636
  // 4662168
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 2658813+ '&appid=' + Apikey) 
  // fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 1153669+ '&appid=' + Apikey) 
  // fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 1282028+ '&appid=' + Apikey) 
  // fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 4034636+ '&appid=' + Apikey) 
  // fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 4662168+ '&appid=' + Apikey) 
  .then(function(response) { 
    return response.json() 
  }) 
    .then(function(data) {
      drawWeather(data);
  })
  .catch(function(error) {
    
  }); 
}
weatherBox(2658813);

function drawWeather(d){
  var degC = Math.floor(d.main.temp - 273.15);
  document.getElementById('temp1').innerHTML = degC + '&deg;';
  document.getElementById('location1').innerHTML = d.name;
}
