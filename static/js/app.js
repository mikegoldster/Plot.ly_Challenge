function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var MetaData = `/metadata/${sample}`;
  d3.json(MetaData).then(function(bbData) {
    // Use d3 to select the panel with id of `#sample-metadata` 
    var bbSample = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    bbSample.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
     // tags for each key-value in the metadata.
    Object.entries(bbData).forEach(function([key, value]) {
      console.log(key, value)
      var row = bbSample.append("p");
      row.text(`${key}: ${value}`);
    });
  });
}
   

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var plotData = `/samples/${sample}`;
    // @TODO: Build a Bubble Chart using the sample data
    d3.json(plotData).then(function(bubbleData) {
      var bubbleX = bubbleData.otu_ids;
      var bubbleY = bubbleData.sample_values;
      var markerSize = bubbleData.sample_values;
      var markerColor = bubbleData.otu_ids;
      var textValue = bubbleData.otu_labels;
      
      var trace1 = {
        x: bubbleX,
        y: bubbleY,
        text: textValue,
        mode: 'markers',
        marker: {
          color: markerColor,
          size: markerSize,
        }
      };

      var bubbleTrace = [trace1];

      Plotly.newPlot('bubble', bubbleTrace);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  d3.json(plotData).then(function(pieData)  {
    var pieValues = pieData.sample_values.slice(0,10)
    var pieLabels = pieData.otu_ids.slice(0,10)
    var pieHover = pieData.otu_labels.slice(0,10)
    var pieCreate = [{
      type: "pie",
      values: pieValues,
      labels: pieLabels,
      hoverinfo: pieHover,
      }];

    Plotly.newPlot("pie", pieCreate);
    });
  });
};

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
