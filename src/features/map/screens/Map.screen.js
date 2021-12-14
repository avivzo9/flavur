import React, { useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import Search from "../../restaurants/cmps/Search.cmp";
import MapCallout from "../cmps/map.callout";

export default function MapScreen({ route }) {
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
    if (!location) return (<MapView style={styles.map} region={{ latitude: 31.4000, longitude: 35.0000, latitudeDelta: (35.0818 - 31.4117), longitudeDelta: 0.1 }} />)

    return (
        <>
            <Search routeName={route.name} />
            <MapView style={styles.map} region={{ latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: 0.05 }}>
                {restaurants.map((rest) => <Marker
                    key={rest.name}
                    title={rest.name}
                    coordinate={{ latitude: rest.geometry.location.lat, longitude: rest.geometry.location.lng }}
                >
                    <MapView.Callout>
                        <MapCallout restaurant={rest} />
                    </MapView.Callout>
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