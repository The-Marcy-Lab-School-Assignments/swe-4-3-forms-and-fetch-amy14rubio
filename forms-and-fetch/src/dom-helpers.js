const discoveredList = document.querySelector('#discovered-list');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

export const renderPokemon = (pokemonObj) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = pokemonObj.sprite;
  const pokeName = document.createElement('p');
  pokeName.textContent = pokemonObj.name;

  const pokeType = document.createElement('p');
  pokeType.textContent = pokemonObj.types;

  li.append(img, pokeName, pokeType);
  discoveredList.append(li);
};

export const renderError = (msg) => {
  error.textContent = msg;
  success.textContent = '';
};

export const renderSuccess = (msg) => {
  success.textContent = msg;
  error.textContent = '';
};
