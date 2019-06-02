// from data.js
var tableData = data;

var tbody = d3.select("tbody");

// Console.log the data from data.js
console.log(data);

data.forEach((UFOsighting) => {
    var row = tbody.append("tr");
    Object.entries(UFOsighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

// Prevent the page from refreshing
  d3.event.preventDefault();

// Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

// Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);
  console.log(tableData);

  var filteredData = tableData.filter(function(ufo) {
      if (inputValue == "")
        return true
    return ufo.datetime == inputValue;
  })

  console.log(filteredData);
  tbody.html("");
  filteredData.forEach((UFOsighting) => {
  var row = tbody.append("tr");
    Object.entries(UFOsighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

});


  