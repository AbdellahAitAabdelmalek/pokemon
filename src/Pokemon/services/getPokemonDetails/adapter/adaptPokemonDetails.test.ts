import {PokemonDetails} from '../types';
import {adaptPokemonDetails} from './adaptPokemonDetails';
import {rawPokemonDetailsFixture} from './rawPokemonDetails.fixture';

describe('adaptPokemonDetails function', () => {
  it('should adapt raw Pokemon details to PokemonDetails type', () => {
    const expectedDetails: PokemonDetails = {
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      type: ['grass', 'poison'],
      abilities: ['overgrow', 'chlorophyll'],
      picture:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
    };

    const adaptedDetails = adaptPokemonDetails(rawPokemonDetailsFixture);

    expect(adaptedDetails).toEqual(expectedDetails);
  });
});
