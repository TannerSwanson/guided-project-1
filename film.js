let filmH1;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchAPI(`/films/${id}`)
    film.characters = await fetchAPI(`films/${id}/characters`)
    film.planets = await fetchAPI(`films/${id}/planets`)
    renderFilm(film);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
}

async function fetchAPI(extraUrl) {
    let url = `${baseUrl}/${extraUrl}`;
    return await fetch(url)
        .then(res => res.json())
}

const renderFilm = film => {
    console.log(film.title)
    document.title = `SWAPI - ${film?.title}`;
    filmH1.textContent = film.title;

    const charList = film.characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charList.join("");

    const planetList = film.planets.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetList.join("");
}
