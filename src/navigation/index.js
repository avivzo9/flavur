import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AppConfigContextProvider } from "../services/appConfig/appConfig.context";
import { AuthContext } from "../services/auth/auth.context";
import { FavouritesContextProvider } from "../services/favourites/favourites.context";
import { LocationContextProvider } from "../services/location/location.context";
import { RestaurantsContextProvider } from "../services/restaurants/restaurants.context";
import AccountNavigator from "./AccountNavigator";
import AppNavigator from "./AppNavigator";

export default function Navigation() {
    const { user } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <AppConfigContextProvider>
                <FavouritesContextProvider>
                    <LocationContextProvider>
                        <RestaurantsContextProvider>
                            {user ? <AppNavigator /> : <AccountNavigator />}
                        </RestaurantsContextProvider>
                    </LocationContextProvider>
                </FavouritesContextProvider>
            </AppConfigContextProvider>
        </NavigationContainer>
    )
};