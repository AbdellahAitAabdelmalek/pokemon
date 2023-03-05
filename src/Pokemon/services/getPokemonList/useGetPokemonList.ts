import {useState, useEffect} from 'react';
import axios from 'axios';
import {Pokemon} from './types';
import {adaptPokemon} from './adapter/adaptPokemon';

interface UseGetPokemonListProps {
  pageSize?: number;
}

const DEFAULT_PAGE_SIE = 20;

const fetchRawPokemon = async ({
  currentPage,
  pageSize,
}: {
  currentPage: number;
  pageSize: number;
}) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${
    currentPage * pageSize
  }&limit=${pageSize}`;

  const response = await axios.get(url);

  return response.data.results;
};

export const useGetPokemonList = ({
  pageSize = DEFAULT_PAGE_SIE,
}: UseGetPokemonListProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const RawPokemonList = await fetchRawPokemon({currentPage, pageSize});

        const adaptedPokemonList = RawPokemonList.map(adaptPokemon);

        setPokemonList(prevData => [...prevData, ...adaptedPokemonList]);
        setHasMore(adaptedPokemonList.length === pageSize);
      } catch (e: any) {
        setError(e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return {pokemonList, isLoading, error, handleLoadMore};
};
