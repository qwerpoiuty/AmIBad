app.factory('d3Factory', function() {
    var svg;

    d3.createStackedGraph = function(id, array) {

        var w = 125,
            h = 200

        // create canvas
        svg = d3.select("#" + id).append("svg:svg")
            .attr("class", "chart")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(10,200)")
        var x = d3.scale.ordinal().rangeRoundBands([0, w - 50])
        var y = d3.scale.linear().range([0, h])
        var z = d3.scale.ordinal().range(["darkblue", "blue", "lightblue"])

        console.log("RAW MATRIX---------------------------");
        // 4 columns: ID,c1,c2,c3
        console.log(array)

        console.log("REMAP---------------------------");
        var remapped = ["c1", "c2", "c3"].map(function(dat, i) {
            return array.map(function(d, ii) {
                return {
                    x: ii,
                    y: d[i + 1]
                };
            })
        });
        console.log(remapped)

        console.log("LAYOUT---------------------------");
        var stacked = d3.layout.stack()(remapped)
        console.log(stacked)

        x.domain(stacked[0].map(function(d) {
            return d.x;
        }));
        y.domain([0, d3.max(stacked[stacked.length - 1], function(d) {
            if (d.y === undefined) d.y = 0
            return (d.y0 + d.y);
        })]);

        // show the domains of the scales
        console.log("x.domain(): " + x.domain())
        console.log("y.domain(): " + y.domain())
        console.log("------------------------------------------------------------------");

        // Add a group for each column.
        var valgroup = svg.selectAll("g.valgroup")
            .data(stacked)
            .enter().append("svg:g")
            .attr("class", "valgroup")
            .style("fill", function(d, i) {
                return z(i);
            })
            .style("stroke", function(d, i) {
                return d3.rgb(z(i)).darker();
            });

        // Add a rect for each date.
        var rect = valgroup.selectAll("rect")
            .data(function(d) {
                return d;
            })
            .enter().append("svg:rect")
            .attr("x", function(d) {
                return x(d.x);
            })
            .attr("y", function(d) {
                return -y(d.y0) - y(d.y);
            })
            .attr("height", function(d) {
                return y(d.y);
            })
            .attr("width", x.rangeBand());
    }

    d3.createBarGraph = function(array) {
        svg = d3.select('')
    }

    return d3;
})