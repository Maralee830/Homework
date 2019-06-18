// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
  };

d3.csv('assets/data/data.csv')
  .then(function(riskData) {
   

    var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var group = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    xLinearScale.domain([d3.min(riskData, function(d) { return parseFloat(d.age); }), d3.max(riskData, function(d) { return parseFloat(d.age); })]);
    yLinearScale.domain([d3.min(riskData, function(d) { return parseFloat(d.obesity); }), d3.max(riskData, function(d) { return parseFloat(d.obesity); })]);

   
   // Add the x-axis.
   group.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(bottomAxis);

    svg.append("text")
       .attr("class", "x label")
       .attr("text-anchor", "middle")
       .attr("x", svgWidth)
       .attr("y", svgHeight - 20)
       .text("age");
   // Add the y-axis.
   group.append("g")
       .attr("class", "y axis")
       .call(leftAxis);
     svg.append("text")
       .attr("class", "y label")
       .attr("text-anchor", "end")
       .attr("y", 6)
       .attr("dy", ".75em")
       .attr("transform", "rotate(-90)")
       .text("obesity");

       group.selectAll("circle")
    .data(riskData)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xLinearScale(parseFloat(d.age));
    })
    .attr("cy", function(d) {
        return yLinearScale(parseFloat(d.obesity));
    })
    .attr("r", 5)
    .attr("fill", "green");

  })


  .catch(function(error){
     console.log(error)
     // handle error   
  })
	   
 

