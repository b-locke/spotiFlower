import React from 'react';
import * as d3 from 'd3';
import _ from 'underscore';
import "./FlowerDisplay.scss";
import genre_list from './data/genre_list.json'
import petals from './data/petals.json'


function DisplayFlowers( { artists } ) {

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    const svgRef = React.useRef(null);

    //Artist attributes

    if (artists == false) {

      var primaryGenre = "acid jazz"
      var secondaryGenre = "nerdcore"
      var tertiaryGenre = "taiwanese pop"
      var followers = 0
      var popularity = 0

    } else {

      var primaryGenre = artists[0].genres[0]
      var secondaryGenre = artists[0].genres.length > 1 ? artists[0].genres[1] : artists[0].genres[0]
      var tertiaryGenre = artists[0].genres.length > 2 ? artists[0].genres[2] : artists[0].genres[0]
      var followers = artists[0].followers.total
      var popularity = artists[0].popularity

    };

    React.useEffect(() => {


        var p = petals.petals

        var petalArray = [p.petalTwo, p.petalOne, p.petalThree, p.petalFour, p.petalFive, p.petalSix, p.petalSix]

        var petalColours = ['#2f90a8', '#6682ff', '#e32b2b', '#e4b623', '#AFD7FF', '#c4fef9',
                                '#F2FA9B', '#FC9590', '#E69D20', '#61ff7a', '#FBF1F0', '#A6D8FF']

        var petalColourScale = d3.scaleOrdinal()
                .domain(['pop', 'hip hop', 'rock', 'funk', 'disco', 'death metal', 'house', 'reggaeton', 'dance pop', 'r&b'])
    	        .range(_.range(0, 10));

        var petalScale = d3.scaleOrdinal()
            .domain(['pop', 'hip hop', 'rock', 'funk', 'disco', 'techno', 'house'])
            .range(_.range(5));

        var secondPetalScale = d3.scaleOrdinal()
            .domain(['rock', 'funk', 'disco', 'techno', 'house', 'pop', 'hip hop'])
            .range(_.range(7));

        var numPetalScale = d3.scaleQuantize()
            .domain([30000, 2400000])
            .range(arrayRange(3, 24, 1));

        var petalSizeScale = d3.scaleOrdinal()
            .domain(_.range(50, 100))
            .range(arrayRange(1.2, 2.2, 0.02));

        function scalePetal (petal, scaleFactor) {
            var scaledPetal = []
            for (let i = 0; i < petal.length; i++) {
                scaledPetal.push(typeof petal[i] === "number" ? petal[i] * scaleFactor : petal[i])
              }
            return scaledPetal
        }

        console.log(primaryGenre)
        console.log(secondaryGenre)
        console.log(tertiaryGenre)
        console.log(followers)
        console.log(numPetalScale(followers))

        const svgEl = d3.select(svgRef.current)
        svgEl.selectAll('*').remove();

        const width = "740"
        const height = "740"

        const svg = svgEl
                .attr("width", width)
                .attr("height", height)
        
        var defs = svg.append("defs");

        defs.append("filter")
                .attr("id", "motionFilter")
                .attr("width", "500%")	
                .attr("x", "-100%") 
                .append("feGaussianBlur")	
                .attr("in", "SourceGraphic")
                .attr("stdDeviation", "8 8");

        //baseblur
        var circleScale = petalSizeScale(popularity) * 0.5;

        svg.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 100)
                .attr('stroke', 'black')
                .attr('fill', petalColours[petalColourScale(tertiaryGenre)])
                .attr('opacity', 0.8)
                .attr('transform', function(d) {
                var x = (width / circleScale) / 2;
                var y = (height / circleScale) / 2;
                return 'scale(' + circleScale + ')' + 'translate(' + [x, y] +
                ')rotate(' + 1 + ')';
            }).style("filter", "url(#motionFilter)");

        //primary petal
        var primaryPetalScale = petalSizeScale(popularity);

        console.log('test', petalArray[genre_list.genre_list[primaryGenre]], primaryGenre)
        console.log(scalePetal(petalArray[genre_list.genre_list[primaryGenre]]), primaryGenre)

        svg.selectAll()
            .data(function(d) {
                var numPetals = numPetalScale(followers);
                var petal = petalArray[genre_list.genre_list[primaryGenre]]
                var path = scalePetal(petal, 200);
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
              .attr("fill", petalColours[petalColourScale(primaryGenre)])
              .attr("fill-opacity", "0.3")
              .attr('stroke-width', function(d) {
                    return 2 / 3;
                })
              .attr('d', function(d) {return d.path.join(' ')})
              .attr('transform', function(d) {
                var cx = (width / primaryPetalScale) / 2;
                var cy = (height / primaryPetalScale) / 2;
                return 'scale(' + primaryPetalScale + ')' + 'translate(' + [cx, cy] +
                      ')rotate(' + [d.angle] + ')';
            });

        var secondaryPetalScale = primaryPetalScale * 0.6

        svg.selectAll()
            .data(function(d) {
                var numPetals = 6;
                var path = scalePetal(petalArray[genre_list.genre_list[secondaryGenre]], 200);
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
              .attr("fill", petalColours[petalColourScale(primaryGenre)])
              .attr("fill-opacity", "0.95")
              .attr('stroke-width', function(d) {
                    return 2 / 3;
                })
              .attr('d', function(d) {return d.path.join(' ')})
              .attr('transform', function(d) {
                var cx = (width / secondaryPetalScale) / 2;
                var cy = (height / secondaryPetalScale) / 2;
                return 'scale(' + secondaryPetalScale + ')' + 'translate(' + [cx, cy] +
                      ')rotate(' + [d.angle] + ')';
            });

        var circleScale = petalSizeScale(popularity) / 4;

        svg.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 100)
                .attr('stroke', 'black')
                .attr('fill', petalColours[3])
                .attr('opacity', 0.8)
                .attr('transform', function(d) {
                var x = (width / circleScale) / 2;
                var y = (height / circleScale) / 2;
                return 'scale(' + circleScale + ')' + 'translate(' + [x, y] +
                ')rotate(' + 1 + ')';
            }).style("filter", "url(#motionFilter)");

        var tertiaryPetalScale = primaryPetalScale * 0.3
              
        svg.selectAll()
            .data(function(d) {
                var numPetals = numPetalScale(followers);
                var path = petalArray[genre_list.genre_list[tertiaryGenre]];
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
              .attr("fill", petalColours[petalColourScale(secondaryGenre)])
              .attr("fill-opacity", "0.2")
              .attr('stroke-width', function(d) {
                    return 2 / 3;
                })
              .attr('d', function(d) {return d.path.join(' ')})
              .attr('transform', function(d) {
              var cx = (width / tertiaryPetalScale) / 2;
              var cy = (height / tertiaryPetalScale) / 2;
              return 'scale(' + tertiaryPetalScale + ')' + 'translate(' + [cx, cy] +
                    ')rotate(' + [d.angle] + ')';
            });
    })

return ( <div>
            <svg id="flower-one" ref={svgRef}></svg>
            <div>{primaryGenre}, {secondaryGenre} & {tertiaryGenre}</div>
        </div>)

}

export default DisplayFlowers;
