function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    //const url = "http://robdunnlab.com/projects/belly-button-biodiversity/";

    // Fetch the JSON data and console log it

    d3.csv("/../DataSets/belly_button_metadata.csv").then(function(data){
        data.forEach(function(d){
            d.sample = +d.sample;
            d.AGE = +d.AGE;
            d.WFREQ = +d.WFREQ;
            d.ZIP012 = +d.ZIP012;
            d.ZIP1319 = +d. ZIP1319;
            d.IMPSURFACE013 = +d.IMPSURFACE013;
            d.NPP013 = +d.NPP013;
            d.MMAXTEMP013 = +d.MMAXTEMP013;
            d. IMPSURFACE1319 = +d.IMPSURFACE1319;
            d.NPP1319 = +d.NPP1319;
            d.MMAXTEMP1319 = +d.MMAXTEMP1319;
            d.PFC1319 = +d.PFC1319;
        });
        console.log(data[0]);
    });
    //	NPP013	MMAXTEMP013	PFC013	IMPSURFACE1319	NPP1319	MMAXTEMP1319	PFC1319

   // d3.csv("/data/cities.csv").then(function(data) {
     //   data.forEach(function(d) {
       //   d.population = +d.population;
         // d.age = +d.age;
        //  d.wfreq = d.wfreq;

      //    d["land area"] = +d["land area"];
      //  });
     //   console.log(data[0]);
    //  });
      
   // d3.json(url).then(function(data) {
   //   console.log(data);
   // });
    
    // Promise Pending
   // const dataPromise = d3.json(url);
    //console.log("Data Promise: ", dataPromise);
    
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    //var userInfo = {
      //  name: "Eric",
       // age: 32,
      //  location: "North America"
     // };
      
      // Use `Object.values` and `forEach` to iterate through keys
      Object.keys(userInfo).forEach(key => console.log(key));
      
      // Use `Object.values` and `forEach` to iterate through values
      Object.values(userInfo).forEach(value => console.log(value));
      
      // Use `Object.entries` and `forEach` to iterate through keys and values
      Object.entries(userInfo).forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
      

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
