import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../features/account/screens/Account.screen';
import LoginScreen from '../features/account/screens/Login.screen';
import RegisterScreen from '../features/account/screens/Register.screen';

const Stack = createStackNavigator();

export default function AccountNavigator() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={AccountScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
        </Stack.Navigator>
    )
};