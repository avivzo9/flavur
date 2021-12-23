import React from 'react';
import { RestaurantsNavigator } from './stacks/restaurantsStack';
import { FavouritesContextProvider } from '../services/favourites/favourites.context';
import { LocationContextProvider } from '../services/location/location.context';
import { RestaurantsContextProvider } from '../services/restaurants/restaurants.context';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RestaurantsDetails from '../features/restaurants/screens/RestaurantsDetails';

const AppStack = createStackNavigator()

export default function AppNavigator() {

    return (
        <FavouritesContextProvider>
            <LocationContextProvider>
                <RestaurantsContextProvider>
                    <AppStack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
                        <AppStack.Screen name="app" component={RestaurantsNavigator} />
                        <AppStack.Screen name='RestaurantDetails' component={RestaurantsDetails} />
                    </AppStack.Navigator>
                </RestaurantsContextProvider>
            </LocationContextProvider>
        </FavouritesContextProvider>
    )
};