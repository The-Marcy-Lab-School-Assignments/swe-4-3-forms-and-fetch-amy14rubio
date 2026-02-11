const FORM_URL = 'https://formspree.io/f/mkovojnd';

export const getRandomPokemon = async () => {
  try {
    const id = Math.floor(Math.random() * 151);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }

    const pokeData = await response.json();

    const pokemonObj = {
      name: pokeData.name.replace(/^./, (char) => char.toUpperCase()),
      types: pokeData.types
        .map((key) => key.type.name.replace(/^./, (char) => char.toUpperCase()))
        .join(', '),
      sprite: pokeData.sprites.front_default,
    };

    return { data: pokemonObj, error: null };
  } catch (error) {
    console.error(error.message);
    return { data: null, error };
  }
};

export const postDiscoveredPokemon = async (formData) => {
  const formValues = Object.fromEntries(formData);

  const config = {
    method: 'POST',
    body: JSON.stringify(formValues),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };

  try {
    const response = await fetch(FORM_URL, config);

    if (!response.ok) {
      throw Error(`Failed to submit. ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();

    return { data: responseData, error: null };
  } catch (error) {
    console.error(error.message);
    return { data: null, error };
  }
};
