window.addEventListener('load', (e) => {
    // select the svg as a container
    const svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
    // add a title to your data table
    svg.append("text").attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .attr("fill", "teal")
        .attr("x", (width / 2))
        .attr("y", .3 * height)
        .style("text-decoration", "underline")
        .text("Swiss population development");

    // on the x axis you want d3 to fill the width from 0 to full width automatic with specified padding between the bars
    let xScale = d3.scaleBand().rangeRound([0, width]).padding(0.4),
        // because an svg fills up allways from the top left corner the range starts from height to 0
        yScale = d3.scaleLinear().range([height, 0]);
    // set a g as container for the bars
    let container = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

    /**
     * TODO catch the data and do something with it
     */

    /**
     * I am a Promise
     */

    d3.dsv(',', 'data/switzerland.csv', d3.autoType).then((data) => {

        // populate the x axis with the year values and the y axis with the population 
        xScale.domain(data.map((d) => d.year));
        yScale.domain([0, d3.max(data, (d) => d.population)])
        // The d3.axisBottom() function in D3.js is used to create a bottom horizontal axis.
        container.append("g").attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(xScale))
        // The d3.axisLeft() function in D3.js is used to create a left vertical axis.
        container.append("g").call(d3.axisLeft(yScale).tickFormat(d => "Population: " + d).ticks(10))
        container.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            // d => d.year, we are all arrow functions ;-)
            .attr("id", d => d.year)
            // bind the values to the desired axles
            .attr("x", d => xScale(d.year))
            .attr("y", d => yScale(d.population))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.population))
            // you have to manually write the title tag into the svg
            // on hover it will appear as a tooltip 
            .append("title")
            .text(d => d.population)






    }).catch((err) => {
        console.log(err);
    });

    // show a data list
    d3.dsv(',', '../data/switzerland.csv', d3.autoType).then((data) => {

        d3.select('div').selectAll('p')
            .data([...data])
            .enter()
            .append('p')
            .attr("class", "simple")
            .attr("id", data => data.year)
            .text(data => 'Bevölkerung im Jahre ' + data.year + ': ' + data.population)

    }).catch((err) => {
        console.log(err);
    });



})