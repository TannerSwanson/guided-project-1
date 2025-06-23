let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  console.log(id);
  getFilm(id)
});

async function getFilm(id) {
  let character;
  try {
    film = await fetchFilm(id)
    console.log(film)
    film.characters = await fetchCharacters(id)
    film.planets = await fetchPlanets(id)
    console.log(film.characters);
    console.log(film.planets);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  console.log(filmUrl);
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(id) {
    let characterUrl = `${baseUrl}/films/${id}/characters`;
    console.log(characterUrl);
    return await fetch(characterUrl)
        .then(res => res.json())
}

async function fetchPlanets(id) {
    let planetUrl = `${baseUrl}/films/${id}/planets`;
    console.log(planetUrl);
    return await fetch(planetUrl)
        .then(res => res.json())
}

const renderFilm = film => {
    console.log(film.title)
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    filmH1.textContent = film.title;

    const charList = film.characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charList.join("");

    const planetList = film.planets.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetList.join("");
}
