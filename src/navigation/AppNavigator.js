import React, { useContext, useEffect, useRef, useState } from 'react';
import { RestaurantsNavigator } from './stacks/restaurantsStack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RestaurantsDetails from '../features/restaurants/screens/RestaurantsDetails';
import { LocationContext } from '../services/location/location.context';
import { AppState } from 'react-native';
import { AppConfigContext } from '../services/appConfig/appConfig.context';

const AppStack = createStackNavigator()

export default function AppNavigator() {
    const { initLocation } = useContext(LocationContext)
    const { isLocationOn } = useContext(AppConfigContext)

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", async nextAppState => {
            if (nextAppState === "active") {
                await isLocationOn()
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <AppStack.Navigator screenOptions={{ gestureEnabled: true, gestureResponseDistance: 300, headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
            <AppStack.Screen name="app" component={RestaurantsNavigator} />
            <AppStack.Screen name='RestaurantDetails' screenOptions={{ gestureDirection: "horizontal" }} component={RestaurantsDetails} />
        </AppStack.Navigator>
    )
};