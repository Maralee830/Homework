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
    // data is now whole data set
    // draw chart in here!
    //console.log(riskData);

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

   // Add the y-axis.
   group.append("g")
       .attr("class", "y axis")
       .call(leftAxis);

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
	    // Append y-axis label
  //   {(  chart
    //    .append("text")
      //  .attr("transform", "rotate(-90)")
       // .attr("y", 0-margin.left + 40)
        //.attr("x", 0 - height/2)
        //.attr("dy","1em")
       // .attr("class", "axis-text")
       // .text("Obesity")

    // Append x-axis labels
     // )} {(chart
       // .append("text")
        //.attr(
        //    "transform",
          //  "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
        //)
        //.attr("class", "axis-text")
        //.text("Age")
      //)
// Load data from hours-of-tv-watched.csv
//d3.csv("assets/data/data.csv", function(riskData) {

  // Log an error if one exists
  //if (error) return console.warn(error);

  // Print the riskData
 /* console.log(riskData);

  // Cast the hours value to a number for each piece of riskData
  riskData.forEach(function(data) {
    data.income = +data.income;
    data.obesity = +data.obesity
  });

//  var barSpacing = 10; // desired space between each bar
 // var scaleY = 10; // 10x scale on rect height

  // @TODO
  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//  var barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / tvData.length;
	//scale function
    var xScale = d3.scaleLinear()
    //.domain(["Alabama","Alaska","Arizona","Arkansas","California"])
    .domain([0, d3.max(riskData, function(d) { return d[0]; })])
    //.range([padding, w-padding * 2]);
    .range([padding, w - padding * 2]);
    
var yScale = d3.scaleLinear()
    .domain([0, d3.max(riskData, function(d) { return d[1]; })])
    //.range([padding, w-padding * 2]);
    .range([h - padding, padding]);

var xAxis = d3.axisBottom().scale(xScale).ticks(5);

var yAxis = d3.axisLeft().scale(yScale).ticks(5);

//create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

chartGroup.selectAll("circle")
			.data(riskData)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return xScale(d[0]);
			})
			.attr("cy", function(d) {
				return h - yScale(d[1]);
			})
			.attr("r", 5)
            .attr("fill", "green");
//x axis
svg.append("g")
.attr("class", "x axis")	
.attr("transform", "translate(0," + (h - padding) + ")")
.call(xAxis);

//y axis
svg.append("g")
.attr("class", "y axis")	
.attr("transform", "translate(" + padding + ", 0)")
.call(yAxis);
  // Create code to build the bar chart using the tvData.
 // chartGroup.selectAll(".bar")
  /*  .data(tvData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.hours * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.hours * scaleY);
});*/

