
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
        return d["Year"];
    });

    var originDim = ndx.dimension(function (d) {
        return d["Origin"];
    });

    var countryDim = ndx.dimension(function (d) {
        return d["Country"]

    })


    var minYear = yearDim.bottom(1)[0]["Year"];
    var maxYear = yearDim.top(1)[0]["Year"];


//Calculating Metrics (usually y-axis)


    var all = ndx.groupAll();


    var totalRefugee = originDim.group().reduceSum(function (d) {
        return d["Refugees"];
    });


    originDim.filter("Syria")
    var syrianRefugees = yearDim.group().reduceSum(function (d) {
        return d['TotalPopulation']

    });


//LIST OF CHARTS - DON'T FORGET TO CHANGE HTML
    var originChart = dc.rowChart("#origin-chart");
    var countryChart = dc.pieChart("#country-chart");
    var syriaChart = dc.barChart("#syria-chart");
    var totalPeople = dc.numberDisplay("#number-box");


    //WHAT QUESTION DOES YOUR CHART ANSWER??

    countryChart
        .height(220)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(countryDim)
        .group(totalRefugee);


    originChart
        .width(800)
        .height(500)
        .dimension(originDim)
        .group(totalRefugee)
        .transitionDuration(500)
        .xAxis().ticks(10)
    originChart.ordering(function (d) { return -d.value})
    originChart.rowsCap([10])
    originChart.othersGrouper(false);


    syriaChart
        .width(800)
       .height(500)
       .margins({top: 10, right: 75, bottom: 30, left: 75})
       .dimension(yearDim)
       .group(syrianRefugees)
       .transitionDuration(500)
        .x(d3.scale.linear().domain([minYear, maxYear]))
        .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4)
    syriaChart.xAxis().tickFormat(d3.format('d'))
    syriaChart.x(d3.scale.linear().domain([2000, 2014])).tickFormat(d3.format("d"));

    // syriaChart.ordinalColors(['#679AAB']);


    totalPeople
        .formatNumber(d3.format(","))
        .valueAccessor( function(d) { return d.value })
        .group(totalRefugee);


    dc.renderAll();
}




 // .x(d3.scale.linear().domain([2000, 2014])).tickFormat(d3.format("d"));