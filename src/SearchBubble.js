import React from 'react';
import * as d3 from 'd3';
import _ from 'underscore';


function SearchBubble( { artists } ) {
    console.log('pre: ', artists)
    const sliced = Object.keys(artists).slice(0, 10).reduce((result, key) => {
        result[key] = artists[key];

        return result;
    }, {});

    //artists = artists.slice(0,1)
    console.log('post: ', artists)


    const svgRef = React.useRef(null);
    //let artistFollowers = data.map()

    React.useEffect(() => {

        // Copyright 2021 Observable, Inc.
        // Released under the ISC license.
        // https://observablehq.com/@d3/bubble-chart
        function BubbleChart(data, {
            name = ([x]) => x, // alias for label
            label = name, // given d in data, returns text to display on the bubble
            value = ([, y]) => y, // given d in data, returns a quantitative size
            group, // given d in data, returns a categorical value for color
            title, // given d in data, returns text to show on hover
            link, // given a node d, its link (if any)
            linkTarget = "_blank", // the target attribute for links, if any
            width = 2000, // outer width, in pixels
            height = width, // outer height, in pixels
            padding = 100, // padding between circles
            margin = 1, // default margins
            marginTop = margin, // top margin, in pixels
            marginRight = margin, // right margin, in pixels
            marginBottom = margin, // bottom margin, in pixels
            marginLeft = margin, // left margin, in pixels
            groups, // array of group names (the domain of the color scale)
            colors = d3.schemeTableau10, // an array of colors (for groups)
            fill = "#ccc", // a static fill color, if no group channel is specified
            fillOpacity = 0.7, // the fill opacity of the bubbles
            stroke, // a static stroke around the bubbles
            strokeWidth, // the stroke width around the bubbles, if any
            strokeOpacity, // the stroke opacity around the bubbles, if any
            genre,
            popularity
        } = {}) {

            console.log(data);
            // Compute the values.
            const D = d3.map(data, d => d);
            const V = d3.map(data, value);
            const G = group == null ? null : d3.map(data, group);
            const I = d3.range(V.length).filter(i => V[i] > 500);

            // Petals
            var petalPaths = [["M0 0 C37.5 100 -2.5 153 5 150 C-20 130 -45 40 0 0 Z"],
                              ["M0 0 L-37.5 75 C-75 150 -2.5 150 0 112.5 C0 150 75 150 37.5 75 Z"],
                              ["M0 0 C-25 100 -2.5 150 -20 150 C0 150 25 100 0 0 Z"],
                              ["M0 0 C-75 100 72.5 150 75 112.5 C75 150 150 100 0 0 Z"],
                              ["M0 0 C-75 100 -2.5 150 0 112.5 C0 150 75 100 0 0 Z"],
                              ["M0 0 C-28 40 -1 60 0 45 C0 60 30 40 0 0 Z"],
                              ["M0 0 C-50 100 0 150 -25 175 C0 150 50 100 0 0 Z"],
                              ["M0 0 C45 80 -2.5 150 0 112.5 C0 150 75 100 0 0 Z"],
                              ["M0 0 C-75 100 72.5 150 75 112.5 C75 150 150 100 0 0 Z"],
                              ["M0 0 C-75 100 72.5 150 75 112.5 C75 150 150 100 0 0 Z"],
                              ["M0 0 C20 100 68 125 75 130 C55 95 95 100 77 160 C77 160 140 100 0 0 Z"]]

            var petalColours = ['#2f90a8', '#e4b623', '#e32b2b', '#e4b623', '#AFD7FF', '#81E3A8',
                                '#F2FA9B', '#FC9590', '#E69D20', '#F2FA9B', '#FBF1F0', '#A6D8FF']

            var petalColourScale = d3.scaleOrdinal()
                .domain(['pop', 'hip hop', 'rock', 'funk', 'disco', 'techno', 'house', 'reggaeton', 'dance pop'])
    	        .range(_.range(9));

            var petalScale = d3.scaleOrdinal()
    	        .domain(['pop', 'hip hop', 'rock', 'funk', 'disco', 'techno', 'house'])
                .range(_.range(7));

            var secondPetalScale = d3.scaleOrdinal()
    	        .domain(['rock', 'funk', 'disco', 'techno', 'house', 'pop', 'hip hop'])
                .range(_.range(7));

            var numPetalScale = d3.scaleQuantize()
                .domain(_.range(50, 100, 5))
                .range(_.range(8, 24));

            var offSetScale = d3.scaleQuantize()
                .domain(_.range(40, 70, 10))
                .range(_.range(1, 3));

        
            // Unique the groups.
            if (G && groups === undefined) groups = I.map(i => G[i]);
            groups = G && new d3.InternSet(groups);
        
            // Construct scales.
            const color = G && d3.scaleOrdinal(groups, colors);
        
            // Compute labels and titles.
            const L = label == null ? null : d3.map(data, label);
            const T = title === undefined ? L : title == null ? null : d3.map(data, title);
            const Genres = genre === undefined ? L : genre == null ? null : d3.map(data, genre);
            const P = popularity === undefined ? L : popularity == null ? null : d3.map(data, popularity);

            // Compute layout: create a 1-deep hierarchy, and pack it.
            const root = d3.pack()
                .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
                .padding(padding)
            (d3.hierarchy({children: I})
                .sum(i => V[i]));

            const svgEl = d3.select(svgRef.current); // Selecting the current svg.
            svgEl.selectAll("*").remove();
        
            const svg = svgEl
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-marginLeft, -marginTop, width, height])
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                .attr("fill", "currentColor")
                .attr("font-size", 10)
                .attr("font-family", "sans-serif")
                .attr("text-anchor", "middle");
            

            const leaf = svg.selectAll("a")
                .data(root.leaves())
                .join("a")
                    .attr("xlink:href", link == null ? null : (d, i) => link(D[d.data], i, data))
                    .attr("target", link == null ? null : linkTarget)
                    .attr("transform", d => `translate(${d.x},${d.y})`)

            leaf.append("circle")
                    .attr("stroke", stroke)
                    .attr("stroke-width", strokeWidth)
                    .attr("stroke-opacity", 0.3)
                    .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
                    .attr("fill-opacity", fillOpacity)
                    .attr("r",  d => d.r)
                    .style("filter", "url(#motionFilter)");

            leaf.selectAll("a")
                .data(function(d) {
                    var numPetals = numPetalScale(P[d.data]);
                    var path = petalPaths[petalScale(G[d.data])];
                    var colour = petalColours[petalColourScale(G[d.data])]
                return _.times(numPetals, function(i) {
                    return {
                    colour: colour,
                    scales: 0,
                    angle: (360/numPetals) * i,
                    path: path
                    }
                })
            }).enter().append('path')
                .attr("stroke", 'black')
                .attr("stroke-opacity", 0.8)
                .attr('stroke-width', function(d) {
                    return 2 / 4;
                })
                .attr("fill", function(d) {return d.colour})
                .attr("fill-opacity", 0.8)
                .attr('d', function(d) {return d.path.join(' ')})
                .attr('transform', function(d) {
                var cx = d.scales;
                var cy = d.scales;
                return 'translate(' + [cx, cy] +
                        ')rotate(' + [d.angle] + ')';
                });

            leaf.selectAll("a")
                .data(function(d) {
                    var numPetals = 6;
                    var path = petalPaths[petalScale(G[d.data]) + offSetScale(P[d.data])];
                    var colour = petalColours[petalColourScale(G[d.data]) + offSetScale(P[d.data])]
                return _.times(numPetals, function(i) {
                    return {
                    colour: colour,
                    scales: 0,
                    angle: (360/numPetals) * i,
                    path: path
                    }
                })
            }).enter().append('path')
                .attr("stroke", 'black')
                .attr("stroke-opacity", 0.8)
                .attr('stroke-width', function(d) {
                    return 2 / 4;
                })
                .attr("fill", function(d) {return d.colour})
                .attr("fill-opacity", 0.8)
                .attr('d', function(d) {return d.path.join(' ')})
                .attr('transform', function(d) {
                var cx = d.scales;
                var cy = d.scales;
                return 'translate(' + [cx, cy] +
                        ')rotate(' + [d.angle] + ')';
                });
        
            if (T) leaf.append("title")
                .text(d => T[d.data])
        
            if (L) {
            // A unique identifier for clip paths (to avoid conflicts).
            const uid = `O-${Math.random().toString(16).slice(2)}`;
        
            leaf.append("clipPath")
                .attr("id", d => `${uid}-clip-${d.data}`)
                .append("circle")
                .attr("r", d => d.r);
        
            leaf.append("text")
                .selectAll("tspan")
                .data(d => `${L[d.data]}`.split(/\n/g))
                .join("tspan")  
                .attr("x", 0)
                .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
                .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
                .text(d => d)
                .attr("font-size", 5)
            }
    
        return Object.assign(svg.node(), {scales: {color}});
    }

    if (artists.length > 0) {

        BubbleChart(artists, {
            label: d => d.name,
            value: d => d.followers.total,
            group: d => d.genres[0],
            title: d => d.name,
            link: d => d.external_urls[0],
            genre: d => d.genres[0],
            popularity: d => d.popularity,
            width: 1152
          })

    }

    }, [artists]);

    return <svg ref={svgRef}/>

}

export default SearchBubble;