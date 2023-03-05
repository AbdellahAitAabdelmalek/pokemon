import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Pokemon} from '../Pokemon/services/getPokemonList/types';
import {useGetPokemonList} from '../Pokemon/services/getPokemonList/useGetPokemonList';
import {RootStackParamList} from '../RootNavigation';

type PokemonListProps = NativeStackScreenProps<
  RootStackParamList,
  'PokemonList'
>;

export const PokemonList = ({navigation}: PokemonListProps) => {
  const {pokemonList, isLoading, error, handleLoadMore} = useGetPokemonList({
    pageSize: 20,
  });

  const renderItem = ({item}: {item: Pokemon}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PokemonDetails', {pokemonId: item.id})
        }
        style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.id}>#{item.id}</Text>
      </Pressable>
    );
  };

  const renderFooter = () => {
    if (!isLoading) {
      return null;
    }
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        testID="pokemon-list"
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 14,
    color: '#888',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});
