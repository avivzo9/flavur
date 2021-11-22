import * as React from 'react';
import { StatusBar } from 'react-native';
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context';
import { LocationContextProvider } from './src/services/location/location.context';
import Navigation from './src/navigation/AppNavigator';
import { FavouritesContextProvider } from './src/services/favourites/favourites.context';

export default function App() {

  return (
    <>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <Navigation />
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
      <StatusBar style="auto" />
    </>
  )
};