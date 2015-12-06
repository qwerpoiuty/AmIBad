app.factory('d3Factory', function() {
    var svg;

    d3.createBarGraph = function(json, element) {
        var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width = 350 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;


        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1)

        var x1 = d3.scale.ordinal()

        var y = d3.scale.linear()
            .range([height, 0])

        var color = d3.scale.ordinal()
            .range(['#459AB7', '#6DB3BF', '#92D0C9'])

        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient('bottom')

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')


        svg = d3.select(element)
            .append('div')
            .classed('svg-container', true)
            .append('svg')
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 340 300")
            .classed('svg0content-responsive', true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // var svg = d3.select(element).append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-5, 0]).html(function(d) {
                return "<span><strong>" + d.value + "</strong></span>"
            })
        svg.call(tip)
        var data = json

        var intervals = d3.keys(data[0]).filter(function(key) {
            return (key !== 'time')
        })

        data.forEach(function(d) {
            d.value = intervals.map(function(name) {
                return {
                    name: name,
                    value: +d[name]
                };
            });
        })


        x0.domain(data.map(function(d) {
            return d.time
        }));
        x1.domain(intervals).rangeRoundBands([5, x0.rangeBand()]);
        y.domain([0, (10 + d3.max(data, function(d) {
            return d3.max(d.value, function(d) {
                return d.value
            });
        }))]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)


        var state = svg.selectAll(".time")
            .data(data)
            .enter().append("g")
            .attr("class", "time")
            .attr("transform", function(d) {
                return "translate(" + x0(d.time) + ",0)";
            });

        state.selectAll("rect")
            .data(function(d) {
                return d.value;
            })
            .enter().append("rect")
            .attr('class', 'bar')
            .attr("width", x1.rangeBand() * .9)
            .attr("x", function(d) {
                return x1(d.name);
            })
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("height", function(d) {
                return height - y(d.value) - 1;
            })
            .style("fill", function(d) {
                return color(d.name);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

    }

    return d3;
})