const map = L.map('map-template').setView([18.4367, -69.9724], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);