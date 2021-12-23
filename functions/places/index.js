const { mocks, addMockImages } = require('./mock')
const url = require('url')
const functions = require('firebase-functions');
const { default: axios } = require('axios');

module.exports.placesRequest = (request, response, client) => {
    const KEY = functions.config()
    const { location, mock } = url.parse(request.url, true).query;
    if (mock === 'true') {
        const data = mocks[location]
        if (!data) return
        data.results = data.results.map((rest) => addMockImages(rest))
        response.json(data)
    } else {
        client.placesNearby({
            params: {
                location,
                radius: 3000, //Meter
                type: 'restaurant',
                key: functions.config().google.key
            },
            timeout: 1000,
        }).then((res) => {
            if (!res || !res.data) {
                getPlacesByUrl()
                    .then((res) => response.json(res))
                    .catch((err) => response.json(err))
            }
            else {
                res.data.results = res.data.results.map((rest) => addGoogleImage(rest))
                response.json(res.data)
            }
        }).catch(() => {
            getPlacesByUrl()
                .then((res) => response.json(res))
                .catch((err) => response.json(err))
        })
    }
}

// Haifa - 32.794046%2C34.989571
// Tel Aviv - 32.0853%2C34.781768

const addGoogleImage = (rest) => {
    if (!rest.photos || !rest.photos[0] || !rest.photos[0].photo_reference) return
    else {
        const ref = rest.photos[0].photo_reference
        rest.photos = [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${functions.config().google.key}`]
    }
    return rest;
}

const getPlacesByUrl = async () => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.794046%2C34.989571&radius=1500&type=restaurant&key=${functions.config().google.key}`
        const res = await axios.get(url);
        const places = res.data.results;
        places.map((rest) => addGoogleImage(rest));
        return places;
    } catch (err) {
        return err;
    }
}