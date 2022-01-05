import React, { useContext } from "react";
import RestaurantsScreen from "../../features/restaurants/screens/Restaurants.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../../features/favorites/screens/Favorites.screen";
import MapScreen from "../../features/map/screens/Map.screen";
import SettingsNavigator from "../SettingsNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppConfigContext } from "../../services/appConfig/appConfig.context";
import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const Tab = createBottomTabNavigator();
const TABS = {
    home: 'restaurant-outline',
    favorites: 'heart-outline',
    map: 'map-outline',
    settings: 'settings-outline'
}

export const RestaurantsNavigator = () => {
    const { isDarkMode } = useContext(AppConfigContext)

    const screenOptions = ({ route }) => {
        const iconName = TABS[route.name]
        return {
            tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle: styles(isDarkMode).tabBarDarkMode,
            headerShown: false,
            tabBarShowLabel: false,
        }
    }

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='home' component={RestaurantsScreen} />
            <Tab.Screen name="favorites" options={{ title: 'Favorites' }} component={FavoritesScreen} />
            <Tab.Screen name="map" options={{ title: 'Map' }} component={MapScreen} />
            <Tab.Screen name="settings" options={{ title: 'Settings' }} component={SettingsNavigator} />
        </Tab.Navigator>
    )
}

const styles = (isDark) => StyleSheet.create({
    tabBarDarkMode: {
        backgroundColor: isDark ? colors.darkMode.dark : colors.darkMode.light
    }
})
