import * as React from 'react';
import { StatusBar } from 'react-native';
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context';
import { LocationContextProvider } from './src/services/location/location.context';
import Navigation from './src/navigation/AppNavigator';

export default function App() {

  return (
    <>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Navigation />
        </RestaurantsContextProvider>
      </LocationContextProvider>
      <StatusBar style="auto" />
    </>
  )
};