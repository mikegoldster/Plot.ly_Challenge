function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var MetaData = `/metadata/${sample}`;
  d3.json(MetaData).then(function(data) {
  // Use d3 to select the panel with id of `#sample-metadata`
    var bbSample = d3.select("#sample-metada");
  // Use `.html("") to clear any existing metadata
    bbSample.html("");
  // Use `Object.entries` to add each key and value pair to the panel
  //   Object.entries(data).forEach(([key, value]) => {
  //     bbSample.append("p")
  //     .text(`${key}:${value}`);
  // });
    //
    Object.entries(data).forEach(function([key, value]) {
      console.log(key, value)
      var rowSample = (`${key}: ${value}`);
        var cell = bbSample.append("h5");
        cell.text(rowSample);
    });
  });
}
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

function buildCharts(sample) {
}
  // @TODO: Use `d3.json` to fetch the sample data for the plots



    // @TODO: Build a Bubble Chart using the sample data



    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

//     var bbpie = {
//   labels: [],
//   values: [],
//   type: 'pie'
// };
//
// var data = [bbpie];
//
// var layout = {
//   title: "Belly Button Chart",
// };
//
// Plotly.newPlot("plot", data, layout);
// }

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
