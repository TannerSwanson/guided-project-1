let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationalPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  climateSpan = document.querySelector('span#climate');
  surfaceWaterSpan = document.querySelector('span#surface_water');
  diameterSpan = document.querySelector('span#diameter');
  rotationalPeriodSpan = document.querySelector('span#rotational_period');
  terrainSpan = document.querySelector('span#terrain');
  gravitySpan =   document.querySelector('span#gravity');
  orbitalPeriodSpan = document.querySelector('span#orbital_period');
  populationSpan = document.querySelector('span#population');
  charactersUl = document.querySelector('#characters>ul');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacters(id)
      planet.films = await fetchFilms(id)
    }
    catch (ex) {
      console.error(`Error reading planet ${id} data.`, ex.message);
    }
    console.log("Returned Planet Object:", planet)
    renderPlanet(planet);
}

async function fetchPlanet(id) {
    try{
        return await fetch(`http://localhost:9001/api/planets/${id}`)
        .then(res => res.json())
    }catch(e){
        console.log(e.message)
    }
}
  
  async function fetchCharacters(id) {
    const url = `http://localhost:9001/api/planets/${id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    console.log("Planet's chars:", characters)
    return characters;
  }
  
  async function fetchFilms(id) {
    const url = `http://localhost:9001/api/planets/${id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    console.log("Planet's films:", films)
    return films;
  }
  
  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate
    surfaceWaterSpan.textContent = planet?.surface_water
    diameterSpan.textContent = planet?.diameter
    rotationalPeriodSpan.textContent = planet?.rotation_period
    terrainSpan.textContent = planet?.terrain
    gravitySpan.textContent = planet?.gravity
    orbitalPeriodSpan.textContent = planet?.orbital_period
    populationSpan.textContent = planet?.population
    const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    charactersUl.innerHTML = charactersLis.join("")
  }
  

//curl -H "Content-Type: application/json" -X GET http://localhost:9001/api/film/10/planets