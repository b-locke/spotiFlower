import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './LineChart.css';

const LineChart = () => {
    const d3Chart = useRef()
    const parseDate = d3.timeParse('%Y-%m-%d')

    useEffect(() => {
        fetch('https://data.cityofnewyork.us/resource/tg4x-b46p.json')
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                console.log('after data')

                const permits = data.filter(event => {
                    return event.eventtype === 'Shooting Permit'
                })

                const dates = [...new Set(permits.map(each => each.enteredon.slice(0, 10)))]
                console.log(dates)
                console.log('after dates')
                let CountsByDate = []

                dates.map(time=>{
                    let date = time
                    let count = 0
                    permits.map(each=>{
                        let timestamp = each.enteredon.slice(0,10)
                        if (timestamp === date) {count +=1}
                    })

                    const counts = {date:parseDate(date), count:count}
                    CountsByDate.push(counts)
                })

                CountsByDate = CountsByDate.reverse()

                const margin = {top:50, right:30, bottom:30, left:30}
                const width = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
                const height = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom

                const svg = d3.select(d3Chart.current)
                                .attr('width', width + margin.left + margin.right)
                                .attr('height', height + margin.top + margin.bottom)
                                .style('background-color', '9F3119')
                                .append('g')
                                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                const x = d3.scaleTime()
                            .domain(d3.extent(CountsByDate, function(d){return d.date}))
                            .range([0, width])

                const max = d3.max(CountsByDate, function(d){return d.count})
                const y = d3.scaleLinear()
                            .domain([0, max])
                            .range([height, 0])
                
                let repeat = () => {

                    console.log("max is", width)

                    svg.selectAll("path").remove();

                    svg.append('g')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(d3.axisBottom(x))

                    svg.append('g')
                        .call(d3.axisLeft(y))

                    var totalLength = width * 10

                    var path = svg.append('path')
                        .datum(CountsByDate)
                        .attr('fill', 'none')
                        .attr('stroke', 'white')
                        .attr('stroke-width', 3)

                    path
                        .attr('d', d3.line()
                                    .x(function(d){return x(d.date)})
                                    .y(function(d){return y(d.count)})
                        )
                        .attr("stroke-dasharray", totalLength + " " + totalLength / 2)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(14000)
                        .attr("stroke-dashoffset", 0)
                        .on("end", repeat);

                    };
                repeat();
                

                svg.append('text')
                    .attr('x', (width/2))
                    .attr('y', (margin.top/2 - margin.top))
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '16px')
                    .attr('fill', 'white')
                    .text('New York City Film Shoot Permits')
                
            })
    })

    return (
        <div id='d3demo'>
            <svg ref={d3Chart}>
            </svg>
        </div>
    )
}

export default LineChart;