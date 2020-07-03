var myMap = L.map("mapid", {
    center: [15,0],
    zoom: 2
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

var link = "../static/data/presenting.json";

function getType() {
    var list = document.getElementById("energy_type_input");
    for (var i = 0; i < list.length; i++) {
        var option = list.options[i];
        if (option.value == energyType) {
            return option.text;
        };
    };
};

var energyType;

function createMap() {

    energyType = d3.select("#energy_type_input").property("value");
    
    var year = d3.select("#year_input").property("value");
    var units;
    switch (energyType) {
        case 'coal_consumption':
            units = "(Mt)";
            break;
        case 'natural_gas_production':
            units = "(bcm)";
            break;
        case 'renewables_in_electricity_production':
            units = "(%)";
            break;
        case 'oil_consumption':
            units = "(Mt)";
            break;
        case 'energy_production':
            units = "(Mtoe)";
            break;
        case 'coal_production':
            units = "(Mt)";
            break;
        case 'electricity_production':
            units = "(TWh)";
            break;
        case 'electricity_consumption':
            units = "(TWh)";
            break
        case 'energy_consumption':
            units = "(Mtoe)";
            break;
        case 'wind_and_solar_in_electricity_production':
            units = "(%)";
            break;
        case 'oil_production':
            units = "(Mt)";
            break;
        case 'natural_gas_consumption':
            units = "(bcm)";
            break;
        default:
            units = "";
    };

    var geo_json;

    d3.json(link, function(data) {
        geo_json = L.choropleth(data, {
            valueProperty: `${energyType}_${year}`,
            scale: ["#FFFFFF", "#8B0000"],
            steps: 10,
            mode: "e",
            style: {
                color: "#FFFFFF",
                weight: 1,
                fillOpacity: 0.8
            },

            onEachFeature: function(feature, layer) {
                layer.bindPopup(`<h5>${feature.properties.name}</h5><br><h6>${feature.properties[`${energyType}_${year}`]} ${units}</h6>`);
            }
        }).addTo(myMap);

        var legend = L.control({position: "bottomleft"});

        legend.onAdd = function() {
            var limits = geo_json.options.limits;
            var colors = geo_json.options.colors;
            var labels = [];

            limits.forEach(function(limit, index) {
                labels.push(`<li style=\"background-color: ${colors[index]}\"></li>`);
            });

            div.innerHTML = `<h5 class=\"legend_label\">${getType()}</h5>
            <div class=\"labels\">
                <div class=\"min\">${limits[0]}</div>
                <div class=\"max\">${limits[limits.length-1]}</div>
            </div>
            <ul>${labels.join("")}</ul>`;
            
            return div;
        };

        legend.addTo(myMap);
    });
};

var div = L.DomUtil.create("div", "legend");

createMap();

d3.select("#energy_type_input").on("change", createMap());
d3.select("#year_input").on("change", createMap());