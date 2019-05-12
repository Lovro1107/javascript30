const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))

function matchWord (wordToMatch, cities) {
  const regex = new RegExp(wordToMatch, 'gi')
  return cities.filter(city => city.city.match(regex) || city.state.match(regex))
}

const suggestions = document.querySelector('ul.suggestions')

function findCity () {
  let html = ''

  // if input isn't empty, search for a city
  if (this.value.length) {
    const places = matchWord(this.value, cities)

    if (places.length) {
      const regex = new RegExp(this.value, 'gi')
      html = places.map(place => {
        const city = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const state = place.state.replace(regex, `<span class="hl">${this.value}</span>`)

        return `<li>
                <span>${city}, ${state}</span>
                <span class="population">${place.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            </li>`
      }).join('')
    } else {
      html = '<li>No city matched your seach!</li>'
    }
  }

  suggestions.innerHTML = html
}

// add a listener to search input
document.getElementById('search-bar').addEventListener('change', findCity)

// stop page reload on form submit
document.querySelector('form').addEventListener('submit', e => e.preventDefault())
