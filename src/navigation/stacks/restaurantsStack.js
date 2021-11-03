import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import RestaurantsScreen from "../../features/restaurants/screens/Restaurants.screen";
import { Text } from "react-native";

const RestaurantStack = createStackNavigator()

export const RestaurantsNavigator = () => {

    return (
        <RestaurantStack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
            <RestaurantStack.Screen name='Restaurants' component={RestaurantsScreen} />
            <RestaurantStack.Screen name='RestaurantDetails' component={() => <Text>RestaurantDetails</Text>} />
        </RestaurantStack.Navigator>
    )
}