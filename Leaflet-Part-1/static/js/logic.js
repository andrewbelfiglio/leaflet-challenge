// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
let myMap = L.map("map").setView([44.967243, -103.771556], 4);

// Add a tile layer to our map
// Use the addTo method to add objects to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Get the USGS endpoint
const earthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

d3.json(earthquakes).then(function(data) {
    console.log(data.features);

    // Create a for loop to map the earthquakes
    for (let i = 0; i < data.features.length; i++) {
        let lat = data.features[i].geometry.coordinates[1];
        let lon = data.features[i].geometry.coordinates[0];
        let depth = data.features[i].geometry.coordinates[2];
        let magnitude = data.features[i].properties.mag;

        // Add circle
        let currentcircle = L.circle([lat, lon], {
            color: {
                fillColor: depth,
                steps: 10,
                mode: "q",
                style: {
                color: "#fff",
                weight: 1,
                },
            },
            fillOpacity: depth/50,
            radius: magnitude*40000

        }).addTo(myMap);

        // Bind a popup to each layer
        currentcircle.bindPopup("<strong>" + data.features[i].properties.title + "</strong><br /><br />" +
            "Depth: " + depth + " km" + "<br /><br />" +
            "<a href=" + data.features[i].properties.url + ">Click here to learn more<" + "/a>")
            .addTo(myMap);
    };

});