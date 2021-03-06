var svg = d3.select("body").append("svg");
var projection = d3.geoEqualEarth().rotate([90, 0, 0]);
var path = d3.geoPath().projection(projection);

var url = "https://aeriforme.github.io/lasermap/countries.geojson";
var data_url = "https://aeriforme.github.io/lasermap/facilities.geojson";

Promise.all([d3.json(url), d3.json(data_url)]).then(function(data) {
  var world = data[0];
  var places = data[1];
  
  svg.append("path")
    .attr("d", path(world))
    .attr("fill", "lightgray")
    .attr("stroke", "white");
  
  svg.selectAll("circle")
    .data(places.features)
  .enter()
    .append("circle")
    .attr("r", "10px")
    .attr("cx", function(d) {
      return projection(d.geometry.coordinates)[0]
    })
    .attr("cy", function(d) {
      return projection(d.geometry.coordinates)[1]
    })
    .attr("fill", "darkgreen")
    .attr("opacity", 0.5)
  
  window.setTimeout(function() {
    svg.selectAll("circle")
      .transition().duration(5000)
      .attr("r", "10px");
  }, 5000);
});
