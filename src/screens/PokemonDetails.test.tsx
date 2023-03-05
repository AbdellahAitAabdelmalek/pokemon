import React from 'react';

import {render, screen, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import {rawPokemonDetailsFixture} from '../Pokemon/services/getPokemonDetails/adapter/rawPokemonDetails.fixture';
import {PokemonDetails} from './PokemonDetails';

jest.mock('axios');

const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

const mockFetchRawPokemon = (data: any) => {
  mockedAxiosGet.mockResolvedValueOnce({
    data,
  });
};

describe('useGetPokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should 
      - call the right url on navigation to a specific pokemonId
      - display the right pokemon information : 
        - the name.
        - the list of type;
        - the weight;
        - the height;
        - the list of abilities;
      `, async () => {
    mockFetchRawPokemon(rawPokemonDetailsFixture);

    const pokemonId = 12;

    // @ts-ignore
    render(<PokemonDetails route={{params: {pokemonId: pokemonId}}} />);

    expect(mockedAxiosGet).toBeCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
    );

    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeTruthy());
    expect(screen.getByText('height : 7')).toBeTruthy();
    expect(screen.getByText('weight : 69')).toBeTruthy();
    expect(screen.getByText('abilities : overgrow,chlorophyll')).toBeTruthy();
    expect(screen.getByText('type : grass,poison')).toBeTruthy();
  });
});
