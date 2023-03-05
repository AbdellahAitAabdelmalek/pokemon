import {Pokemon, RawPokemon} from '../types';
import {adaptPokemon} from './adaptPokemon';

describe('adaptPokemon', () => {
  it('adapts raw Pokemon data into Pokemon type', () => {
    const rawPokemon: RawPokemon = {
      name: 'pokemonName1',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };

    const expectedPokemon: Pokemon = {
      id: 1,
      name: 'pokemonName1',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };

    const adaptedPokemon = adaptPokemon(rawPokemon);
    expect(adaptedPokemon).toEqual(expectedPokemon);
  });
});
