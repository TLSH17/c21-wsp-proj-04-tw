// // check location
// var x = document.getElementById("currentLocation");

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showPosition(position) {

//     // show location
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//         "<br>Longitude: " + position.coords.longitude;

//     var map = L.map('map').setView([22.3725531, 114.1076726], 13);

//     var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

//     var marker = L.marker([22.3725531, 114.1076726]).addTo(map)
//         .bindPopup('<b>You are here! Jason.</b>').openPopup();
// }

// document.getElementById("getLocationButton").onclick = function () {
//     getLocation();
// }

// // show map
// var map = L.map('map').setView([22.3725531, 114.1076726], 13);

// var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var marker = L.marker([22.3725531, 114.1076726]).addTo(map)
//     .bindPopup('<b>You are here. Jason!</b>').openPopup();


// // Longdon
// // 51.52222456854957,-0.16241100651856133