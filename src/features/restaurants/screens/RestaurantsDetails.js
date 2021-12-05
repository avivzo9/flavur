import React from "react"
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantsCard from "../cmps/RestaurantsCard.cmp";

export default function RestaurantsDetails({ route }) {
    const { restaurant } = route.params

    return (
        <SafeAreaView>
            <RestaurantsCard restaurant={restaurant} isNavigate={route} />
            <ScrollView>
                <List.Section title="Accordions">
                    <List.Accordion
                        title="Uncontrolled Accordion"
                        left={props => <List.Icon {...props} icon="food" />}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>
                </List.Section>
            </ScrollView>
        </SafeAreaView>
    )
}

// {"business_status": "OPERATIONAL", 
// "geometry": {"location": {"lat": 37.77361, "lng": -122.421622},
// "viewport": {"northeast": [Object], "southwest": [Object]}}, 
// "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", 
// "ix": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png", 
// "name": "Zuni Café", 
// "opening_hours": {"open_now": true}, 
// "photos": [{"height": 3672, "html_attributions": [Array], "photo_reference": "", "width": 6786}],
// "place_id": "some place id 41", "plus_code": {"compound_code": "", "global_code": ""}, 
// "price_level": 3, 
// "rating": 4.4, 
// "reference": "", "scope": "", 
// "types": ["cafe", "bar", "restaurant", "food", "point_of_interest", "establishment"], 
// "user_ratings_total": 1675, 
// "vicinity": "1658 Market Street, San Francisco"}