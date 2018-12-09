queue()
    .defer(d3.json, "/unitedNations/refugeesReport")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    //Clean projectsJson data
    var Asylum_Seekers = projectsJson;
    var dateFormat = d3.time.format("%Y").parse;


    // var maxCountry = totalRefugee.top(1)[0].value;


    //Create a Crossfilter instance (normally only create one)
    var ndx = crossfilter(Asylum_Seekers);


    //Define Dimensions ( usually on x-axis)
    var yearDim = ndx.dimension(function (d) {
        return d['Year'];
    });

    var originDim = ndx.dimension(function (d) {
        return d['Origin'];
    });

    var countryDim = ndx.dimension(function (d) {
        return d['Country'];

    });



//Calculating Metrics (usually y-axis)


    var all = ndx.groupAll();


    var totalRefugee = originDim.group().reduceSum(function (d) {
        return d['Refugees'];
    });


    var Refugees = yearDim.group().reduceSum(function (d) {
        return d['Refugees'];

    });

    var minYear = yearDim.bottom(1)[0]['Year'];
    var maxYear = yearDim.top(1)[0]['Year'];


//LIST OF CHARTS - DON'T FORGET TO CHANGE HTML
    var originChart = dc.rowChart("#origin-chart");
    var countryChart = dc.pieChart("#country-chart");
    var refugeeBarChart = dc.barChart("#refugee-chart");
    var totalPeople = dc.numberDisplay("#number-box");


    //WHAT QUESTION DOES YOUR CHART ANSWER??

    countryChart
        .height(250)
        .radius(100)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(countryDim)
        .group(totalRefugee)
    d3.scale.category10();


    originChart
        .width(750)
        .height(450)
        .dimension(originDim)
        .group(totalRefugee)
        .transitionDuration(500)
        .xAxis().ticks(10).tickFormat(d3.format("s"))
        originChart.ordering(function (d) {
            return -d.value
        })
        .rowsCap([10])
        .othersGrouper(false);
    d3.scale.category10()(1)



    refugeeBarChart
        .width(1300)
        .height(500)
        .margins({top: 10, right: 75, bottom: 30, left: 75})
        .dimension(yearDim)
        .group(Refugees)
        .transitionDuration(500)
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxisLabel("Number of Refugees")
        .yAxis().ticks(10).tickFormat(d3.format("s"))
        .xAxis().ticks(10).tickFormat(d3.format('d'))
        .x(d3.scale.linear().domain([2005, 2015]));


    totalPeople
        .formatNumber(d3.format(","))
        .valueAccessor(function (d) {
            return d.value
        })
        .group(totalRefugee);


    dc.renderAll();
}



