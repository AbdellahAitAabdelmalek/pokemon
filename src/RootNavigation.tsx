import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PokemonDetails} from './screens/PokemonDetails';
import {PokemonList} from './screens/PokemonList';

export type RootStackParamList = {
  PokemonDetails: {pokemonId: number};
  PokemonList: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="PokemonList" component={PokemonList} />
        <RootStack.Screen name="PokemonDetails" component={PokemonDetails} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
