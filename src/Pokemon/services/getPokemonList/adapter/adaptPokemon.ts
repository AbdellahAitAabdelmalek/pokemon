import {Pokemon, RawPokemon} from '../types';

export const adaptPokemon = (rawPokemon: RawPokemon): Pokemon => {
  const id = Number(rawPokemon.url.split('/')[6]);
  return {
    id,
    name: rawPokemon.name,
    url: rawPokemon.url,
  };
};
