import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AuthContext } from "../services/auth/auth.context";
import AccountNavigator from "./AccountNavigator";
import AppNavigator from "./AppNavigator";

export default function Navigation() {
    const { user } = useContext(AuthContext)

    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AccountNavigator />}
        </NavigationContainer>
    )
};