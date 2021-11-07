import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Settings from '../features/restaurants/screens/Settings.screen';
import { RestaurantsNavigator } from './stacks/restaurantsStack';
import MapScreen from '../features/restaurants/screens/Map.screen';

const Tab = createBottomTabNavigator();
const TABS = {
    home: 'restaurant-outline',
    map: 'md-map',
    settings: 'settings-outline'
}

export default function Navigation() {

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
        <NavigationContainer>
            <Tab.Navigator initialRouteName="home" screenOptions={screenOptions}>
                <Tab.Screen name="home" options={{ title: 'Restaurants' }} component={RestaurantsNavigator} />
                <Tab.Screen name="map" options={{ title: 'Map' }} component={MapScreen} />
                <Tab.Screen name="settings" options={{ title: 'Settings' }} component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};