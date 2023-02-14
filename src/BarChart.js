import React from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {

  //Refs access the DOM. If you pass a ref object to React with <div ref={myRef} />, React will set its .current property to the corresponding DOM node whenever that node changes.
  const svgRef = React.useRef(null);

  //Define the dimensions for the graph.
  const width = 800;
  const height = 450;
  //Margin is created as an object.
  const margin = { top: 30, right: 30, bottom: 30, left: 60 };
  //Dimensions for the svg by adding margins to graph dimensions.
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  //Functions of the component that will run after rendering.
  React.useEffect(() => {

    //Set the scale for the x axis, in this case time.
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.year)) //Extent provide the min and max values from a given array.
      .range([0, width]); 

    //Set the scale for the y axis, in this case population. Split into min and max so the values could be offset.
    const yScale = d3.scaleLinear()
      .domain([
        d3.min(data, (d) => d.population) - 50,
        d3.max(data, (d) => d.population) + 50
      ])
      .range([height, 0]); 
      
    // Create svg root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current); // Selecting the current svg.
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g") // The ‘g’ element is a container element for grouping together related graphics elements in the svg. This allows them to be transformed together.
      .attr("transform", `translate(${margin.left},${margin.top})`); // Updating the svg element with a transform.

    // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale) // Used to create a bottom horizontal axis
      .ticks(20)
      .tickSize(-height + margin.bottom);
    const xAxisGroup = svg.append("g") //grouping the x axis elements
      .attr("transform", `translate(0, ${height - margin.bottom})`) // Sets the position of the x axis
      .call(xAxis); // Running the axis function, xAxis, on the newly created and appended group, g.
    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)"); // Adds the line
    xAxisGroup.selectAll("text") // Text formatting
      .attr("opacity", 0.5)
      .attr("color", "white")
      .attr("font-size", "0.75rem")

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale) // Creates the vertical axis
      .ticks(5)
      .tickSize(-width)
    const yAxisGroup = svg.append("g")
      .call(yAxis);
    yAxisGroup.select(".domain").remove(); // Clear existing domain data
    yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)"); // Draw the line
    yAxisGroup.selectAll("text") // Format the text
      .attr("opacity", 0.5)
      .attr("color", "white")
      .attr("font-size", "0.75rem");

    // Draw the lines
    const line = d3.line() // Constructs a new line generator
      .x((d) => xScale(d.year)) // Sets or gets the x accessor point of the line. If x is provided, it must be a number or a function that returns a number.
      .y((d) => yScale(d.population));
    svg.selectAll(".line") // Select the line constructor within the svg
      .data([data]) // Update the data for the line selected
      .enter() 
      .append("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", svgWidth + " " + svgWidth)
      .attr("stroke-dashoffset", svgWidth)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;;
};

export default BarChart;