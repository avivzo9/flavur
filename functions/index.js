const functions = require("firebase-functions");
const { geocodeRequest } = require('./geocode');
const { placesRequest } = require("./places");

const { Client } = require("@googlemaps/google-maps-services-js");
const { placesDetailsRequest } = require("./placeDetails");
const client = new Client({})

exports.geocode = functions.https.onRequest((request, response) => {
    geocodeRequest(request, response, client);
});

exports.placesNearBy = functions.https.onRequest((request, response) => {
    placesRequest(request, response, client);
});

exports.getPlaceDetails = functions.https.onRequest((request, response) => {
    placesDetailsRequest(request, response);
});