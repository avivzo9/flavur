const { mocks, addMockImages } = require('./mock')
const url = require('url')
const { default: axios } = require('axios');

module.exports.placesRequest = (request, response, client, key) => {
    const { location, mock, radius } = url.parse(request.url, true).query;
    if (mock === 'true') {
        const data = mocks[location]
        if (!data) return
        data.results = data.results.map((rest) => addMockImages(rest))
        response.json(data)
    } else {
        client.placesNearby({
            params: {
                location,
                radius,
                type: 'restaurant',
                key
            },
            timeout: 1000,
        }).then((res) => {
            if (!res || !res.data) {
                getPlacesByUrl(key)
                    .then((res) => response.json(res))
                    .catch((err) => response.json(err))
            }
            else {
                res.data.results = res.data.results.map((rest) => addGoogleImages(rest, key))
                response.json(res.data)
            }
        }).catch(() => {
            getPlacesByUrl(key)
                .then((res) => response.json(res))
                .catch((err) => response.json(err))
        })
    }
}

const addGoogleImages = (rest, key) => {
    if (!rest.photos || !rest.photos[0] || !rest.photos[0].photo_reference) return
    else rest.photos = rest.photos.map(p => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${p.photo_reference}&key=${key}`)
    return rest;
}

const getPlacesByUrl = async (key) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.794046%2C34.989571&radius=1500&type=restaurant&key=${key}`
        const res = await axios.get(url);
        const places = res.data.results;
        places.map((rest) => addGoogleImages(rest));
        return places;
    } catch (err) {
        return err;
    }
}