import React from 'react';

import {PokemonList} from './PokemonList';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import axios from 'axios';

jest.mock('axios');

const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

const mockFetchRawPokemon = (data: any) => {
  mockedAxiosGet.mockResolvedValueOnce({
    data,
  });
};

const rawPokemonListPage1 = {
  results: [
    {name: 'pokemonPage1_0', url: 'https://pokeapi.co/api/v2/pokemon/0/'},
    {name: 'pokemonPage1_1', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
    {name: 'pokemonPage1_2', url: 'https://pokeapi.co/api/v2/pokemon/2/'},
    {name: 'pokemonPage1_3', url: 'https://pokeapi.co/api/v2/pokemon/3/'},
    {name: 'pokemonPage1_4', url: 'https://pokeapi.co/api/v2/pokemon/4/'},
    {name: 'pokemonPage1_5', url: 'https://pokeapi.co/api/v2/pokemon/5/'},
    {name: 'pokemonPage1_6', url: 'https://pokeapi.co/api/v2/pokemon/6/'},
    {name: 'pokemonPage1_7', url: 'https://pokeapi.co/api/v2/pokemon/7/'},
    {name: 'pokemonPage1_8', url: 'https://pokeapi.co/api/v2/pokemon/8/'},
    {name: 'pokemonPage1_9', url: 'https://pokeapi.co/api/v2/pokemon/9/'},
    {name: 'pokemonPage1_10', url: 'https://pokeapi.co/api/v2/pokemon/10/'},
    {name: 'pokemonPage1_11', url: 'https://pokeapi.co/api/v2/pokemon/11/'},
    {name: 'pokemonPage1_12', url: 'https://pokeapi.co/api/v2/pokemon/12/'},
    {name: 'pokemonPage1_13', url: 'https://pokeapi.co/api/v2/pokemon/13/'},
    {name: 'pokemonPage1_14', url: 'https://pokeapi.co/api/v2/pokemon/14/'},
    {name: 'pokemonPage1_15', url: 'https://pokeapi.co/api/v2/pokemon/15/'},
    {name: 'pokemonPage1_16', url: 'https://pokeapi.co/api/v2/pokemon/16/'},
    {name: 'pokemonPage1_17', url: 'https://pokeapi.co/api/v2/pokemon/17/'},
    {name: 'pokemonPage1_18', url: 'https://pokeapi.co/api/v2/pokemon/18/'},
    {name: 'pokemonPage1_19', url: 'https://pokeapi.co/api/v2/pokemon/19/'},
  ],
};

const rawPokemonListPage2 = {
  results: [
    {name: 'pokemonPage2_0', url: 'https://pokeapi.co/api/v2/pokemon/20/'},
    {name: 'pokemonPage2_1', url: 'https://pokeapi.co/api/v2/pokemon/21/'},
    {name: 'pokemonPage2_2', url: 'https://pokeapi.co/api/v2/pokemon/22/'},
    {name: 'pokemonPage2_3', url: 'https://pokeapi.co/api/v2/pokemon/23/'},
    {name: 'pokemonPage2_4', url: 'https://pokeapi.co/api/v2/pokemon/24/'},
    {name: 'pokemonPage2_5', url: 'https://pokeapi.co/api/v2/pokemon/25/'},
    {name: 'pokemonPage2_6', url: 'https://pokeapi.co/api/v2/pokemon/26/'},
    {name: 'pokemonPage2_7', url: 'https://pokeapi.co/api/v2/pokemon/27/'},
    {name: 'pokemonPage2_8', url: 'https://pokeapi.co/api/v2/pokemon/28/'},
    {name: 'pokemonPage2_9', url: 'https://pokeapi.co/api/v2/pokemon/29/'},
    {name: 'pokemonPage2_10', url: 'https://pokeapi.co/api/v2/pokemon/30/'},
    {name: 'pokemonPage2_11', url: 'https://pokeapi.co/api/v2/pokemon/31/'},
    {name: 'pokemonPage2_12', url: 'https://pokeapi.co/api/v2/pokemon/33/'},
  ],
};

const eventData = {
  nativeEvent: {
    contentOffset: {
      y: 500,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 500,
      width: 100,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 100,
      width: 100,
    },
  },
};

describe('useGetPokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should 
      - renders the fist page of a list of Pokemon
      - display the page 2 on scroll down
      - not call fetch when all data are fetched`, async () => {
    mockFetchRawPokemon(rawPokemonListPage1);
    mockFetchRawPokemon(rawPokemonListPage2);

    render(<PokemonList />);

    const flatList = screen.getByTestId('pokemon-list');

    expect(mockedAxiosGet).toBeCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
    );

    await waitFor(() =>
      expect(screen.getByText('pokemonPage1_0')).toBeTruthy(),
    );

    expect(screen.getByText('pokemonPage1_9')).toBeTruthy();

    // scroll down
    fireEvent.scroll(flatList, eventData);

    await waitFor(() => {
      expect(screen.getByText('pokemonPage1_19')).toBeTruthy();
    });

    // force call onEndReached
    await act(() => {
      flatList.props.onEndReached();
    });

    // should call axios 2nd time
    await waitFor(() => expect(mockedAxiosGet).toBeCalledTimes(2));
    expect(mockedAxiosGet).toHaveBeenNthCalledWith(
      2,
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    );

    fireEvent.scroll(flatList, eventData);

    await waitFor(() => {
      expect(screen.getByText('pokemonPage2_0')).toBeTruthy();
      expect(screen.getByText('pokemonPage2_6')).toBeTruthy();
      expect(screen.getByText('pokemonPage2_9')).toBeTruthy();
    });

    // force call onEndReached
    await act(() => {
      flatList.props.onEndReached();
    });

    // should not call axios 3rd time
    await waitFor(() => expect(mockedAxiosGet).toBeCalledTimes(2));
  });
});
