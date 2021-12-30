import React from 'react';
import { RestaurantsNavigator } from './stacks/restaurantsStack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RestaurantsDetails from '../features/restaurants/screens/RestaurantsDetails';

const AppStack = createStackNavigator()

export default function AppNavigator() {

    return (

        <AppStack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
            <AppStack.Screen name="app" component={RestaurantsNavigator} />
            <AppStack.Screen name='RestaurantDetails' component={RestaurantsDetails} />
        </AppStack.Navigator>

    )
};