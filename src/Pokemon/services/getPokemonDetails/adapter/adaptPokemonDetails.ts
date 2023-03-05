import {RawPokemonDetails, PokemonDetails} from '../types';

export const adaptPokemonDetails = (
  data: RawPokemonDetails,
): PokemonDetails => {
  const {name, types, sprites, height, weight, abilities} = data;
  const typeList = types.map(type => type.type.name);
  const abilitiesList = abilities.map(abilitie => abilitie.ability.name);

  return {
    name,
    height,
    weight,
    type: typeList,
    abilities: abilitiesList,
    picture: sprites.other?.home?.front_default ?? sprites.front_default,
  };
};
