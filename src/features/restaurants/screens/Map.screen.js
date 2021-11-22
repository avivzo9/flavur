import React, { useContext, useEffect, useState } from "react"
import { Platform, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import { ActivityIndicator, Colors } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import MapCallout from "../../map/cmps/map.callout";
import Search from "../cmps/Search.cmp";

export default function MapScreen({ route, navigation }) {
    const { location } = useContext(LocationContext)
    const { restaurants } = useContext(RestaurantsContext)
    const { viewport } = location.geometry
    const { lat, lng } = location.geometry.location

    const [latDelta, setLatDelta] = useState(null)

    useEffect(() => {
        const northeastLat = viewport.northeast.lat
        const southwestLat = viewport.southwest.lat
        setLatDelta(northeastLat - southwestLat)
    }, [location, viewport])

    if (!latDelta) return (<ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color={Colors.red800} />)

    return (
        <>
            <Search routeName={route.name} />
            <MapView style={styles.map} region={{ latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: 0.05 }}>
                {restaurants.map((rest) => <Marker
                    key={rest.name}
                    title={rest.name}
                    coordinate={{ latitude: rest.geometry.location.lat, longitude: rest.geometry.location.lng }}
                >
                    <Callout onPress={() => navigation.navigate("RestaurantDetails", { restaurant: rest })}>
                        <MapCallout restaurant={rest} />
                    </Callout>
                </Marker>)}
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
});