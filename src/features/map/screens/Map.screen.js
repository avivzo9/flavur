import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import Loader from "../../Loader";
import Search from "../../restaurants/cmps/Search.cmp";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestaurantsCard from "../../restaurants/cmps/RestaurantsCard.cmp";
import { spacing } from "../../../utils/sizes";

export default function MapScreen({ route, navigation }) {
    const { location } = useContext(LocationContext)
    const { restaurants, restaurantLoading } = useContext(RestaurantsContext)
    const { isLocation } = useContext(AppConfigContext)
    const { viewport } = location.geometry

    const [latDelta, setLatDelta] = useState(null)
    const [currRest, setCurrRest] = useState(null)

    useEffect(() => {
        if (location) {
            const northeastLat = viewport.northeast.lat
            const southwestLat = viewport.southwest.lat
            setLatDelta(northeastLat - southwestLat)
        }
    }, [location, viewport])

    useEffect(() => {
        setCurrRest(restaurants[0])
    }, [])

    if (!latDelta || restaurantLoading) return (<Loader />)
    if (!location) return (<MapView style={styles.map} region={{ latitude: 31.4000, longitude: 35.0000, latitudeDelta: (35.0818 - 31.4117), longitudeDelta: 0.1 }} />)
    const { lat, lng } = location.geometry.location

    return (
        <>
            <Search routeName={route.name} />
            <MapView
                style={styles.map}
                region={{ latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: 0.05 }}
                showsUserLocation={isLocation ? true : false}
                followsUserLocation={false}
                showsBuildings={false}
                showsIndoors={false}
                showsPointsOfInterest={false}
                showsMyLocationButton={true}
            >
                {restaurants.map((rest, idx) => <Marker
                    key={rest.name + idx}
                    title={rest.name}
                    coordinate={{ latitude: rest.geometry.location.lat, longitude: rest.geometry.location.lng }}
                    onPress={() => setCurrRest(rest)}
                    onMarkerPress={() => null}
                >
                    <Ionicons name='location-sharp' size={45} color="tomato" />
                </Marker>)}
            </MapView>
            {currRest &&
                <View style={styles.hoverCardCon}>
                    <RestaurantsCard restaurant={currRest} navigation={navigation} route={route} />
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
    hoverCardCon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: spacing.md
    },
});