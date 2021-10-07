async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const cities = await request.json()


  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = RegExp(wordToMatch, 'gi');
      return place.city.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="h1">${event.target.value.toUpperCase()}</span>`);
      return `
                <li>
                    <span class="name">${place.name}<br>${place.category}<br><em>${place.address_line_1}<br>${cityName}</em><br>${place.zip}</span>
                </li>
                `;
    }).join(',');
    if (searchInput.value == '') {
      suggestions.innerHTML = '';
    } else {
      suggestions.innerHTML = html
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}
window.onload = windowActions;