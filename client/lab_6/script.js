async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const cities = [];

  fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => cities.push(...data));

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = RegExp(wordToMatch, 'gi');
      return place.city.match(regex);
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
      return `
                <li>
                    <span class="name">${place.name}<br>${place.address_line_1}<br>${cityName} ${place.zip}</span>
                </li>
                `;
    }).join(',');
    if (searchInput.value == '') {
      suggestions.innerHTML = '';
    } else {
      suggestions.innerHTML = html;
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
}
window.onload = windowActions;