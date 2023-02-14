import React from 'react';
import * as d3 from 'd3';
import {useEffect, useState} from 'react';
import _ from 'underscore';

function DisplayFlowers () {

    const svgRef = React.useRef(null);

    React.useEffect(() => {

        const petalOne = ["M0 0, C50 100 72.5 153 85 150, C55 130 95 40 75 0 Z"]
        const petalTwo = ["M0 0 C20 100 68 125 75 130 C55 95 95 100 77 160 C77 160 140 100 0 0 Z"]
        const petalThree = ["M0 0 C-75 100 72.5 150 75 112.5 C75 150 150 100 0 0 Z"]
        const petalFour = ["M0 0 C-75 100 -2.5 150 0 112.5 C0 150 75 100 0 0 Z"]
        const petalFive = ["M0 0 C-50 100 0 150 -25 175 C0 150 50 100 0 0 Z"]
        const petalSix = ["M0 0 C45 80 -2.5 150 0 112.5 C0 150 75 100 0 0 Z"]



        const svgEl = d3.select(svgRef.current)
        const width = "400"
        const height = "400"

        const svg = svgEl
                .attr("width", width)
                .attr("height", height)
        
        var defs = svg.append("defs");
        defs.append("filter")
                .attr("id", "motionFilter") 	//Give it a unique ID
                .attr("width", "500%")		//Increase the width of the filter region to remove blur "boundary"
                .attr("x", "-100%") 			//Make sure the center of the "width" lies in the middle of the element
                .append("feGaussianBlur")	//Append a filter technique
                .attr("in", "SourceGraphic")	//Perform the blur on the applied element
                .attr("stdDeviation", "8 8");

        svg.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 100)
                .attr('stroke', 'black')
                .attr('fill', "#e32b2b")
                .attr('opacity', 0.8)
                .attr('transform', function(d) {
                var x = width / 2;
                var y = height / 2;
                return 'translate(' + [x, y] +
                ')rotate(' + 1 + ')';
            }).style("filter", "url(#motionFilter)");

            svg.selectAll()
            .data(function(d) {
                var numPetals = 20;
                var path = petalFour;
              return _.times(numPetals, function(i) {
                return {
                  angle: (360/numPetals) * i,
                  path: path
                }
              });
            }).enter().append('path')
              .classed('petal', true)
              .attr('stroke', "black")
              .attr("stroke-opacity", "0.8")
              .attr("fill", "#2f90a8")
              .attr("fill-opacity", "0.3")
              .attr('stroke-width', function(d) {
                    return 2 / 4;
                })
              .attr('d', function(d) {return d.path.join(' ')})
              .attr('transform', function(d) {
              var cx = width / 2;
              var cy = height / 2;
              return 'translate(' + [cx, cy] +
                    ')rotate(' + [d.angle] + ')';
            });
              
            svg.selectAll()
            .data(function(d) {
                var numPetals = 12;
                var path = petalSix;
              return _.times(numPetals, function(i) {
                return {
                  angle: (360/numPetals) * i,
                  path: path
                }
              });
            }).enter().append('path')
              .classed('petal', true)
              .attr('stroke', "black")
              .attr("stroke-opacity", "0.8")
              .attr("fill", "#e4b623")
              .attr("fill-opacity", "1")
              .attr('stroke-width', function(d) {
                    return 2 / 4;
                })
              .attr('d', function(d) {return d.path.join(' ')})
              .attr('transform', function(d) {
              var cx = width / 2;
              var cy = height / 2;
              return 'translate(' + [cx, cy] +
                    ')rotate(' + [d.angle] + ')';
            });

    })

return ( <svg ref={svgRef}/> )

}

export default DisplayFlowers