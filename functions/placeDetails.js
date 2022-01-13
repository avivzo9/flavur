const { default: axios } = require('axios');
const url = require('url')

module.exports.placesDetailsRequest = (request, response, _, key) => {
    const { placeId } = url.parse(request.url, true).query;
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${placeId}&key=${key}`)
        .then((res) => {
            res.data.result = addGoogleImages(res.data.result, key)
            response.json(res.data)
        }).catch((err) => {
            response.status(400)
            return response.send(err)
        })
}

const addGoogleImages = (rest, key) => {
    if (!rest.photos || !rest.photos[0] || !rest.photos[0].photo_reference) return
    else rest.photos = rest.photos.map(p => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${p.photo_reference}&key=${key}`)
    return rest;
}