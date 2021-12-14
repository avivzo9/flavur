const functions = require('firebase-functions');
const { locations } = require("./geocode.mock")
const url = require('url')

module.exports.geocodeRequest = (request, response, client) => {
    const { city, mock } = url.parse(request.url, true).query;
    if (!city || !city.length) return response.send('Error: No city has specified!')
    if (mock === 'true') {
        const location = locations[city.toLowerCase()]
        response.json(location)
    } else {
        // const KEY = functions.config()
        // response.json(KEY)
        client.geocode({
            params: {
                address: city,
                key: "AIzaSyAuViHJowBExdhvmeG93jbLtfd7IB2AHzQ"
                // key: functions.config().google.key
            },
            timeout: 1000
        }).then((res) => response.json(res.data))
            .catch((err) => {
                response.status(400)
                return response.send(err.response.data.error_message)
            })
    }
}