import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FavoritesContextProvider } from '../services/favorites/favorites.context';
import { LocationContextProvider } from '../services/location/location.context';
import { RestaurantsContextProvider } from '../services/restaurants/restaurants.context';
import SettingsScreen from '../features/settings/screens/Settings.screen';
import CameraScreen from '../features/settings/screens/Camera.screen';

const Stack = createStackNavigator();

export default function SettingsNavigator() {

    return (
        <FavoritesContextProvider>
            <LocationContextProvider>
                <RestaurantsContextProvider>
                    <Stack.Navigator>
                        <Stack.Screen name="Settings" options={{ header: () => null }} component={SettingsScreen} />
                        <Stack.Screen name="Camera" options={{ header: () => null }} component={CameraScreen} />
                    </Stack.Navigator>
                </RestaurantsContextProvider>
            </LocationContextProvider>
        </FavoritesContextProvider>
    )
};