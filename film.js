let filmH1;
let charactersUl;
let planetsUl;
let dirSp;
let prodSp;
let dateSp;
let epSp;
let opening_crawlP;
const baseUrl = `http://localhost:9001/api`;

/*
 <section id="generalInfo">
      <p>Director: <span id="director"></span></p>
      <p>Episode: <span id="episode"></span></p>
      <p>Release Date: <span id="date"></span></p>
      <p>Producers: <span id="producer"></span></p>
*/



// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  dirSp = document.querySelector('span#director');
  prodSp = document.querySelector('span#producer');
  dateSp = document.querySelector('span#date');
  epSp = document.querySelector('span#episode');
  opening_crawlP = document.querySelector('p#opening_crawl');
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
    document.title = `SWAPI - ${film?.title}`;
    filmH1.textContent = film.title;
    dirSp.textContent = film.director;
    prodSp.textContent = film.producer;
    dateSp.textContent = film.release_date;
    epSp.textContent = film.episode_id;

    opening_crawlP.textContent = film.opening_crawl; 

    const charList = film.characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charList.join("");

    const planetList = film.planets.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetList.join("");
}
