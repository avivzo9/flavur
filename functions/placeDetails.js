const { default: axios } = require('axios');
const url = require('url')
const functions = require('firebase-functions');

const KEY = functions.config().google.key

module.exports.placesDetailsRequest = (request, response) => {
    const { placeId } = url.parse(request.url, true).query;
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${placeId}&key=${KEY}`)
        .then((res) => {
            res.data.result = addGoogleImage(res.data.result)
            response.json(res.data)
        }).catch((err) => {
            response.status(400)
            return response.send(err)
        })
}

const addGoogleImage = (rest) => {
    if (!rest.photos || !rest.photos[0] || !rest.photos[0].photo_reference) return
    else {
        const ref = rest.photos[0].photo_reference
        rest.photos = [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${KEY}`]
    }
    return rest;
}