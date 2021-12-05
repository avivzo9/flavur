import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RestaurantsNavigator } from './stacks/restaurantsStack';
import MapScreen from '../features/restaurants/screens/Map.screen';
import { FavouritesContextProvider } from '../services/favourites/favourites.context';
import { LocationContextProvider } from '../services/location/location.context';
import { RestaurantsContextProvider } from '../services/restaurants/restaurants.context';
import SettingsNavigator from './SettingsNavigator';
import FavouritesScreen from '../features/favourites/screens/Favourites.screen';

const Tab = createBottomTabNavigator();
const TABS = {
    home: 'restaurant-outline',
    favourites: 'heart-outline',
    map: 'map-outline',
    settings: 'settings-outline'
}

export default function AppNavigator() {

    const screenOptions = ({ route }) => {
        const iconName = TABS[route.name]
        return {
            tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            headerShown: false
        }
    }

    return (
        <FavouritesContextProvider>
            <LocationContextProvider>
                <RestaurantsContextProvider>
                    <Tab.Navigator screenOptions={screenOptions}>
                        <Tab.Screen name="home" options={{ title: 'Restaurants' }} component={RestaurantsNavigator} />
                        <Tab.Screen name="favourites" options={{ title: 'Favourites' }} component={FavouritesScreen} />
                        <Tab.Screen name="map" options={{ title: 'Map' }} component={MapScreen} />
                        <Tab.Screen name="settings" options={{ title: 'Settings' }} component={SettingsNavigator} />
                    </Tab.Navigator>
                </RestaurantsContextProvider>
            </LocationContextProvider>
        </FavouritesContextProvider>
    )
};