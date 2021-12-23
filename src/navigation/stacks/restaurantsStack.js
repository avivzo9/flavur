import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import RestaurantsScreen from "../../features/restaurants/screens/Restaurants.screen";
import RestaurantsDetails from "../../features/restaurants/screens/RestaurantsDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouritesScreen from "../../features/favourites/screens/Favourites.screen";
import MapScreen from "../../features/map/screens/Map.screen";
import SettingsNavigator from "../SettingsNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const TABS = {
    home: 'restaurant-outline',
    favourites: 'heart-outline',
    map: 'map-outline',
    settings: 'settings-outline'
}
export const RestaurantsNavigator = () => {

    const screenOptions = ({ route }) => {
        const iconName = TABS[route.name]
        return {
            tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            headerShown: false,
            tabBarShowLabel: false
        }
    }

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='home' component={RestaurantsScreen} />
            <Tab.Screen name="favourites" options={{ title: 'Favourites' }} component={FavouritesScreen} />
            <Tab.Screen name="map" options={{ title: 'Map' }} component={MapScreen} />
            <Tab.Screen name="settings" options={{ title: 'Settings' }} component={SettingsNavigator} />
        </Tab.Navigator>
    )
}