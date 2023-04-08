"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const accessTokenToStyles = "a9l6JHmw98DmbUHdesqTJdpf14dcb8GsS5eYkLmhrM0tmQUQ0YiDhyphOgtZyCez";
const map = L.map("map").setView([48.7965913, 2.3210938], 3);
// Setting styles
const styles = [
    "jawg-streets",
    "jawg-sunny",
    "jawg-terrain",
    "jawg-dark",
    "jawg-light",
];
const baselayers = [];
styles.forEach((style) => (baselayers[style] = L.tileLayer(`https://tile.jawg.io/${style}/{z}/{x}/{y}.png?access-token=${accessTokenToStyles}`, {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
})));
baselayers["jawg-streets"].addTo(map);
L.control.layers(baselayers).addTo(map);
//  Setting marker and communicate with api
const input = document.querySelector("input");
const submitButton = document.querySelector('button');
const ipAddress = document.querySelector('.ipaddress');
const locationData = document.querySelector(".location");
const timezoneData = document.querySelector(".timezone");
const ispData = document.querySelector(".isp");
const trackerData = document.querySelector('.trackerData');
function requestdata(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_OVffY3qoQl621DnpaqjiJk9liFKw9&ipAddress=${ip}`);
            const data = yield request.json();
            const { location, isp } = data;
            const { lat, lng, country, region, timezone, } = location;
            ipAddress.innerHTML = ip;
            locationData.innerHTML = `${region}, ${country}`;
            timezoneData.innerHTML = `UTC ${timezone}`;
            ispData.innerHTML = isp;
            trackerData.style.display = 'flex';
            addMarker(lat, lng);
        }
        catch (error) {
            alert("Provide vaild ip address");
            console.log(error);
        }
    });
}
const addMarker = (latidue, lng) => {
    const marker = L.marker([latidue, lng]).addTo(map);
    map.setView([latidue, lng]);
};
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', () => {
    requestdata(input === null || input === void 0 ? void 0 : input.value);
});
