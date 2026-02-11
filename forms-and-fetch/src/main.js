import { renderPokemon, renderError, renderSuccess } from './dom-helpers.js';
import { getRandomPokemon, postDiscoveredPokemon } from './fetch-helpers';

const discoverButton = document.querySelector('#discover-button');
const captureForm = document.querySelector('#capture-form');

const getAndRenderPokemon = async () => {
  try {
    const response = await getRandomPokemon();
    renderPokemon(response.data);
    renderSuccess(`${response.data.name} was discovered!`);
    return { data: response, error: null };
  } catch (error) {
    console.error(error.message);
    renderError(error);
    return { data: null, error };
  }
};

getAndRenderPokemon();

discoverButton.addEventListener('click', () => {
  getAndRenderPokemon();
});

captureForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formValues = Object.fromEntries(new FormData(captureForm));
  formValues.isFavorite = Boolean(formValues.isFavorite);
  try {
    await postDiscoveredPokemon(new FormData(captureForm));
    renderSuccess(`${formValues.name} was discovered!`);
    captureForm.reset();
  } catch (error) {
    console.error(error.message);
    renderError(`Error: unable to capture Pokémon. Please try again later`);
  }
});
