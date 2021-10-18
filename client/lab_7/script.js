async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const cities = await request.json();
  let first_cordinate = [38.989, -76.93];

  const AccessToken = 'pk.eyJ1Ijoic2thbm5lciIsImEiOiJja3VwcHl0bjg0bm55Mm5xajY1bm84Z29mIn0.OmOzzGmPrc0yIMWuPf0X1w';
  let mymap = L.map('mapid').setView(first_cordinate, 11);
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${AccessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = RegExp(wordToMatch, 'gi');
      const places = place.zip.match(regex);
      return places;
    });
  }

  const markers = [];

  function displayMatches(event) {
    markers.forEach((marker) => {
      marker.remove();
    });
    const matchArray = findMatches(event.target.value, cities).slice(0,5);
    matchArray.forEach((p) => {
      if (p.hasOwnProperty('geocoded_column_1')) {
        const point = p.geocoded_column_1;
        const latlong = point.coordinates;
        const marker = latlong.reverse();
        markers.push(L.marker(marker).addTo(mymap));
        console.log(markers);
        first_cordinate = markers[0];
        console.log(first_cordinate);
      }
    });
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const zip = place.zip.replace(regex, `<span class="h1">${event.target.value}</span>`);
      return `
                  <li>
                    <div class="result-container">
                      <span class="name"><strong>${place.name}</strong><br><em>${place.address_line_1}</em></span>
                    </div>
                  </li>
                  `;
    }).join(',');
    if (searchInput.value == '') {
      suggestions.innerHTML = '';
      markers.forEach((marker) => {
        marker.remove();
      });
    } else {
      suggestions.innerHTML = html;
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}
window.onload = windowActions;