
var verWeg;
var dichtbij;
var party;

var clubCoolLokatie =  {
	latitude: 52.220513, 
	longitude: 6.895717
};

window.onload = init;

function init() {
	verWeg = document.getElementById("verweg");
	dichtbij = document.getElementById("bijna");
	party = document.getElementById("party");

	hideAllDivs();
	getMyLocation();
}

function hideAllDivs() {
	verweg.classList.add('hidden');
	dichtbij.classList.add('hidden');
	party.classList.add('hidden');
}

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation);
	}
	else {
		alert("Geen browser support voor geolocating");
	}
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var km = computeDistance(position.coords, clubCoolLokatie);
	
	var distance = document.getElementById("distance");

	distance.innerHTML = km;
	
	if (km < 0.5) {
		party.classList.remove('hidden');
	} else if (km <= 10) {
		dichtbij.classList.remove('hidden');
	} else {
		verWeg.classList.remove('hidden');
	}
}


//
// Uses the Spherical Law of Cosines to find the distance
// between two lat/long points
//
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}
// ------------------ End Ready Bake -----------------