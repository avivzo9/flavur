const { mocks, addMockImages } = require('./mock')
const url = require('url')
const functions = require('firebase-functions');

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
                key: "AIzaSyAuViHJowBExdhvmeG93jbLtfd7IB2AHzQ"
            },
            timeout: 1000,
        }).then((res) => {
            res.data.results = res.data.results.map((rest) => addGoogleImage(rest))
            response.json(res.data)
        }).catch((err) => {
            response.status(400)
            return response.send(err.response.data.error_message)
        })
    }
}

const addGoogleImage = (rest) => {
    const ref = rest.photos[0].photo_reference
    if (!ref) {
        rest.photos = [addMockImages(rest)]
        return rest;
    }
    rest.photos = [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=AIzaSyAuViHJowBExdhvmeG93jbLtfd7IB2AHzQ`]
    return rest;
}