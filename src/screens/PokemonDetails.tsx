import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {useGetPokemonDetails} from '../Pokemon/services/getPokemonDetails/useGetPokemonDetails';
import {RootStackParamList} from '../RootNavigation';

type PokemonDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'PokemonDetails'
>;

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({route}) => {
  const {pokemonDetails, isLoading, error} = useGetPokemonDetails({
    pokemonId: route.params.pokemonId,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!pokemonDetails) {
    return <Text>No pokemonDetails found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: pokemonDetails.picture}} style={styles.image} />
      <Text style={styles.text}>{pokemonDetails.name}</Text>
      <Text style={styles.text}>{`type : ${pokemonDetails.type}`}</Text>
      <Text style={styles.text}>{`height : ${pokemonDetails.height}`}</Text>
      <Text style={styles.text}>{`weight : ${pokemonDetails.weight}`}</Text>
      <Text
        style={styles.text}>{`abilities : ${pokemonDetails.abilities}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
