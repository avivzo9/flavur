import { isMock } from "../app.config";
const noImage = require('../../assets/imgs/no_image.png')

export async function getRestaurants(location) {
    try {
        const restaurants = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/placesNearBy?location=${location}&mock=${isMock}`)
        const { results } = await restaurants.json();
        if (!results) return Promise.reject('No results found')
        const restsToReturn = []
        results.map((rest) => {
            if (!rest) return
            else if (!rest.photos) rest.photos = [noImage]
            if (rest) restsToReturn.push(rest)
        })
        return restsToReturn;
    } catch (err) {
        console.log('err in getRestaurants:', err)
    }
}

export async function getRestaurantDetails(placeId) {
    try {
        const details = await fetch(`https://us-central1-mealstogo-dd9b1.cloudfunctions.net/getPlaceDetails?placeId=${placeId}`)
        return await details.json();
    } catch (err) {
        console.log('err in getRestaurantDetails:', err)
    }
}