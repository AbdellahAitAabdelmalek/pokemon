/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PokemonList} from './src/screens/PokemonList';

const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="PokemonList" component={PokemonList} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
