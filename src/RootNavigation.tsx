import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PokemonList} from './screens/PokemonList';

export type RootStackParamList = {
  PokemonList: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="PokemonList" component={PokemonList} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
