var link = "../static/data/presenting.json";

var years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 
            2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];


var cpY = [];
var ccY = [];
var opY = [];
var ocY = [];
var ngpY = [];
var ngcY = [];
var epY = [];
var ecY = [];
var energypY = [];
var energycY = [];
var rY = [];

d3.json(link, function(data) {
    for (var i = 0; i < data.features.length; i++) {
        if (data.features[i].properties.name == "United States") {
            years.forEach(function(year) {
                cpY.push(data.features[i].properties[`coal_production_${year}`]);
                ccY.push(data.features[i].properties[`coal_consumption_${year}`]);
                opY.push(data.features[i].properties[`oil_production_${year}`]);
                ocY.push(data.features[i].properties[`oil_consumption_${year}`]);
                ngpY.push(data.features[i].properties[`natural_gas_production_${year}`]);
                ngcY.push(data.features[i].properties[`natural_gas_consumption_${year}`]);
                epY.push(data.features[i].properties[`electricity_production_${year}`]);
                ecY.push(data.features[i].properties[`electricity_consumption_${year}`]);
                energypY.push(data.features[i].properties[`energy_production_${year}`]);
                energycY.push(data.features[i].properties[`energy_consumption_${year}`]);
                rY.push(data.features[i].properties[`renewables_in_electricity_production_${year}`]);
            });

            var trace1 = {
                x: years,
                y: cpY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };
            
            var data1 = [trace1];
            
            var cplayout = {
                title: "Coal Production",
                xaxis: {title: "Years"},
                yaxis: {title: "Mt"}
            };

            Plotly.newPlot("coal-prod", data1, cplayout);

            var trace2 = {
                x: years,
                y: ccY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var cclayout = {
                title: "Coal Consumption",
                xaxis: {title: "Years"},
                yaxis: {title: "Mt"}
            };
            
            Plotly.newPlot("coal-cons", [trace2], cclayout);

            var trace3 = {
                x: years,
                y: opY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var oplayout = {
                title: "Oil Production",
                xaxis: {title: "Years"},
                yaxis: {title: "Mt"}
            };
            
            Plotly.newPlot("oil-prod", [trace3], oplayout);

            var trace4 = {
                x: years,
                y: ocY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var oclayout = {
                title: "Oil Consumption",
                xaxis: {title: "Years"},
                yaxis: {title: "Mt"}
            };
            
            Plotly.newPlot("oil-cons", [trace4], oclayout);

            var trace5 = {
                x: years,
                y: ngpY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var ngplayout = {
                title: "Natural Gas Production",
                xaxis: {title: "Years"},
                yaxis: {title: "bcm"}
            };
            
            Plotly.newPlot("natural-gas-prod", [trace5], ngplayout);

            var trace6 = {
                x: years,
                y: ngcY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var ngclayout = {
                title: "Natural Gas Consumption",
                xaxis: {title: "Years"},
                yaxis: {title: "bcm"}
            };
            
            Plotly.newPlot("natural-gas-cons", [trace6], ngclayout);

            var trace7 = {
                x: years,
                y: epY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var eplayout = {
                title: "Electricity Production",
                xaxis: {title: "Years"},
                yaxis: {title: "TWh"}
            };
            
            Plotly.newPlot("electricity-prod", [trace7], eplayout);

            var trace8 = {
                x: years,
                y: ecY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var eclayout = {
                title: "Electricity Consumption",
                xaxis: {title: "Years"},
                yaxis: {title: "TWh"}
            };
            
            Plotly.newPlot("electricity-cons", [trace8], eclayout);

            var trace9 = {
                x: years,
                y: energypY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var energypLayout = {
                title: "Energy Production",
                xaxis: {title: "Years"},
                yaxis: {title: "Mtoe"}
            };
            
            Plotly.newPlot("energy-prod", [trace9], energypLayout);

            var trace10 = {
                x: years,
                y: energycY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var energycLayout = {
                title: "Energy Consumption",
                xaxis: {title: "Years"},
                yaxis: {title: "Mtoe"}
            };
            
            Plotly.newPlot("energy-cons", [trace10], energycLayout);

            var trace11 = {
                x: years,
                y: rY,
                type: "line",
                mode: "lines+markers",
                name: "United States",
                marker: {
                    size: 8
                }
            };

            var rlayout = {
                title: "Share of Renewables in Electricity Production",
                xaxis: {title: "Years"},
                yaxis: {title: "Mtoe"}
            };
            
            Plotly.newPlot("renewables", [trace11], rlayout);
        };
    };
        
});

var countries = ["United States"];

function updateTraces(id) {

    var country_name = d3.select(`#${id}`).text()

    var cpY2 = [];
    var ccY2 = [];
    var opY2 = [];
    var ocY2 = [];
    var ngpY2 = [];
    var ngcY2 = [];
    var epY2 = [];
    var ecY2 = [];
    var energypY2 = [];
    var energycY2 = [];
    var rY2 = [];


    if (countries.indexOf(country_name) > -1) {
        d3.select(`#${id}`).style("color", "rgb(10, 10, 131)");
        Plotly.deleteTraces("coal-prod", countries.indexOf(country_name));
        Plotly.deleteTraces("coal-cons", countries.indexOf(country_name));
        Plotly.deleteTraces("oil-prod", countries.indexOf(country_name));
        Plotly.deleteTraces("oil-cons", countries.indexOf(country_name));
        Plotly.deleteTraces("natural-gas-prod", countries.indexOf(country_name));
        Plotly.deleteTraces("natural-gas-cons", countries.indexOf(country_name));
        Plotly.deleteTraces("electricity-prod", countries.indexOf(country_name));
        Plotly.deleteTraces("electricity-cons", countries.indexOf(country_name));
        Plotly.deleteTraces("energy-prod", countries.indexOf(country_name));
        Plotly.deleteTraces("energy-cons", countries.indexOf(country_name));
        Plotly.deleteTraces("renewables", countries.indexOf(country_name));
        countries.splice(countries.indexOf(country_name), 1);

    }

    else {
        d3.select(`#${id}`).style("color", "red");
        countries.push(country_name);

        d3.json(link, function(data) {
            for (var i = 0; i < data.features.length; i++) {
                if (data.features[i].properties.name == country_name) {
                    years.forEach(function(year) {
                        cpY2.push(data.features[i].properties[`coal_production_${year}`]);
                        ccY2.push(data.features[i].properties[`coal_consumption_${year}`]);
                        opY2.push(data.features[i].properties[`oil_production_${year}`]);
                        ocY2.push(data.features[i].properties[`oil_consumption_${year}`]);
                        ngpY2.push(data.features[i].properties[`natural_gas_production_${year}`]);
                        ngcY2.push(data.features[i].properties[`natural_gas_consumption_${year}`]);
                        epY2.push(data.features[i].properties[`electricity_production_${year}`]);
                        ecY2.push(data.features[i].properties[`electricity_consumption_${year}`]);
                        energypY2.push(data.features[i].properties[`energy_production_${year}`]);
                        energycY2.push(data.features[i].properties[`energy_consumption_${year}`]);
                        rY2.push(data.features[i].properties[`renewables_in_electricity_production_${year}`]);
                    });
                };
            };
        });

        setTimeout(function() {Plotly.addTraces("coal-prod", {x: years, y: cpY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("coal-cons", {x: years, y: ccY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("oil-prod", {x: years, y: opY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("oil-cons", {x: years, y: ocY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("natural-gas-prod", {x: years, y: ngpY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("natural-gas-cons", {x: years, y: ngcY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("electricity-prod", {x: years, y: epY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() { Plotly.addTraces("electricity-cons", {x: years, y: ecY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("energy-prod", {x: years, y: energypY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("energy-cons", {x: years, y: energycY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);
        setTimeout(function() {Plotly.addTraces("renewables", {x: years, y: rY2, name: country_name, type: "line", mode: "lines+markers",marker: {size: 8}});}, 1000);

    };
};

d3.selectAll(".country").on("click", updateTraces(this.id));