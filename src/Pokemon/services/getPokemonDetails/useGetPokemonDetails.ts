import {useState, useEffect} from 'react';
import axios from 'axios';
import {PokemonDetails} from './types';
import {adaptPokemonDetails} from './adapter/adaptPokemonDetails';

interface UseGetPokemonDetailsProps {
  pokemonId: number;
}

const fetchRawPokemonDetails = async (pokemonId: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
  );
  return response.data;
};

export const useGetPokemonDetails = ({
  pokemonId,
}: UseGetPokemonDetailsProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<
    PokemonDetails | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const rawPokemonDetails = await fetchRawPokemonDetails(pokemonId);

        const adaptedPokemonDetails = adaptPokemonDetails(rawPokemonDetails);

        setPokemonDetails(adaptedPokemonDetails);
      } catch (e: any) {
        setError(e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [pokemonId]);

  return {pokemonDetails, isLoading, error};
};
