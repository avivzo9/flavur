import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AppConfigContextProvider } from "../services/appConfig/appConfig.context";
import { AuthContext } from "../services/auth/auth.context";
import { FavoritesContextProvider } from "../services/favorites/favorites.context";
import { LocationContextProvider } from "../services/location/location.context";
import { RestaurantsContextProvider } from "../services/restaurants/restaurants.context";
import AccountNavigator from "./AccountNavigator";
import AppNavigator from "./AppNavigator";

export default function Navigation() {
    const { user } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <AppConfigContextProvider>
                <FavoritesContextProvider>
                    <LocationContextProvider>
                        <RestaurantsContextProvider>
                            {user ? <AppNavigator /> : <AccountNavigator />}
                        </RestaurantsContextProvider>
                    </LocationContextProvider>
                </FavoritesContextProvider>
            </AppConfigContextProvider>
        </NavigationContainer>
    )
};