const { default: axios } = require('axios');
const url = require('url')

module.exports.placesDetailsRequest = (request, response) => {
    const { placeId } = url.parse(request.url, true).query;
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${placeId}&key=AIzaSyAuViHJowBExdhvmeG93jbLtfd7IB2AHzQ`)
        .then((res) => {
            response.json(res.data)
        }).catch((err) => {
            response.status(400)
            return response.send(err.response.data.error_message)
        })
}