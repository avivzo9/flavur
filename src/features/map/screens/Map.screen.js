import React, { useContext, useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { AppConfigContext } from "../../../services/appConfig/appConfig.context";
import Loader from "../../Loader";
import Search from "../../restaurants/cmps/Search.cmp";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestaurantCard from "../../restaurants/cmps/RestaurantCard.cmp";
import { spacing } from "../../../utils/sizes";

export default function MapScreen({ route, navigation }) {
    const { location, isLocationLoading } = useContext(LocationContext)
    const { restaurants, restaurantLoading } = useContext(RestaurantsContext)
    const { isLocation } = useContext(AppConfigContext)

    const scrollRef = useRef()

    const [currRest, setCurrRest] = useState(null)
    const [isRestFocus, setIsRestFocus] = useState(false)
    const [regionData, setRegionData] = useState({ latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: 0.05 })

    useEffect(() => {
        if (location) {
            const { viewport } = location.geometry
            const northeastLat = viewport.northeast.lat
            const southwestLat = viewport.southwest.lat
            setRegionData({ latitude: location.geometry.location.lat, longitude: location.geometry.location.lng, latitudeDelta: (northeastLat - southwestLat), longitudeDelta: 0.05 })
            if (route.params && route.params.restaurant) {
                currRest ?
                    (route.params.restaurant.place_id != currRest.place_id) ? setCurrRest(route.params.restaurant) : setCurrRest(restaurants[0])
                    : setCurrRest(route.params.restaurant)
            }
            else setCurrRest(restaurants[0])
        }
    }, [location, route, restaurants])

    useEffect(() => {
        if (currRest) setRegion(currRest)
    }, [currRest])

    const setRegion = (rest) => {
        if (!isRestFocus) return
        const northeastLat = rest.geometry.viewport.northeast.lat
        const southwestLat = rest.geometry.viewport.southwest.lat
        setRegionData({ latitude: rest.geometry.location.lat, longitude: rest.geometry.location.lng, latitudeDelta: (northeastLat - southwestLat), longitudeDelta: 0.02 })
    }

    if (restaurantLoading || isLocationLoading) return (<Loader />)
    if (!location || !regionData || !currRest) return (<MapView style={styles.map} region={{ latitude: 31.4000, longitude: 35.0000, latitudeDelta: (35.0818 - 31.4117), longitudeDelta: 0.1 }} />)

    return (
        <>
            <Search routeName={route.name} />
            <MapView
                style={styles.map}
                region={regionData}
                showsUserLocation={isLocation ? true : false}
                followsUserLocation={false}
                showsBuildings={false}
                showsIndoors={false}
                showsPointsOfInterest={false}
                showsMyLocationButton={false}
            >
                {restaurants.map((rest, idx) => <Marker
                    key={rest.name + idx}
                    title={rest.name}
                    coordinate={{ latitude: rest.geometry.location.lat, longitude: rest.geometry.location.lng }}
                    onPress={() => {
                        setCurrRest(rest)
                        setIsRestFocus(true)
                        scrollRef.current?.scrollTo({ y: 0, animated: true });
                    }}
                >
                    <Ionicons name='location-sharp' size={45} color={currRest ? currRest.place_id === rest.place_id ? "tomato" : "black" : "black"} />
                </Marker>)}
            </MapView>
            {currRest && <View style={styles.hoverCardCon}>
                <RestaurantCard scrollRef={scrollRef} restaurant={currRest} navigation={navigation} route={route} />
            </View>}
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