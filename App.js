import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import RestaurantsScreen from './src/features/restaurants/screens/Restaurants.screen';

export default function App() {

  return (
    <>
      <RestaurantsScreen />
      <StatusBar style="auto" />
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});