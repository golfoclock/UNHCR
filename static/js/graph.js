
 queue()
   .defer(d3.json, "/refugeesProject/refugeesUNHCR")
   .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    //Clean projectsJson data
    var Asylum_Seekers = projectsJson;
    var dateFormat = d3.time.format("%Y").parse;
    // Asylum_Seekers.forEach(function (d) {
    //     // d["Year"] = dateFormat.parse(d["Year"]);
    //     // d["Year"].setDate(1);
    // });




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

    });

    var refugeeDim = ndx.dimension(function (d) {
        return d["Refugees"];
    });

    var totalPopulationDim = ndx.dimension(function (d) {
        return d["TotalPopulation"];
    });



//Calculating Metrics (usually y-axis)
//     var numYear = yearDim.group();



        // var n = allRefugees.groupAll().reduceCount().value();

        var all = ndx.groupAll();

        var numCountry = countryDim.group();


        var totalPopulation = originDim.group().reduceSum(function (d) {
            return d["TotalPopulation"];
        });

        var totalRefugee = originDim.group().reduceSum(function (d) {
            return d["Refugees"];
        });

        originDim.filter("Syrian Arab Rep.");


        var syrianRefugees = yearDim.group().reduceSum(function (d) {
            return d['TotalPopulation']

        });

        var numTotalPopulation = totalPopulationDim.group();


//example:


        // var max_FleeingCountry = country_of_origin.top(1)[0].value;
        // var max_ReceivingCountry = country_of_residence.top(1)[0].value;
        // var max_returnedIDP = returnedIDP.top(1)[0].value;

        //Define values (to be used in charts)
        // var minYear = yearDim.bottom(1)[0]["minYear"];
        // var maxYear = yearDim.top(1)[0]["maxYear"];




//LIST OF CHARTS - DON'T FORGET TO CHANGE HTML
        var originChart = dc.rowChart("#origin-chart");
        var countryChart = dc.pieChart("#country-chart");
        var syriaChart = dc.barChart("#syria-chart");
        // var returnedIDPChart = dc.rowChart("#returned-idp-chart");
        // var returnedRefugee = dc.rowChart("#returned-refugee-chart");
        // var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
        // var numberProjectsND = dc.numberDisplay("#number-projects-nd");
        // var totalDonationsND = dc.numberDisplay("#total-donations-nd");
        // var fundingStatusChart = dc.pieChart("#funding-chart");
        // var primaryFocusSubjectChart = dc.pieChart("#primary-focus-subject");
        // var globalChart = dc.geoChoroplethChart("#us-chart");




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
        .xAxis().ticks(10);
    originChart.ordering(function (d) { return -d.value});
    originChart.rowsCap([10]);
    originChart.othersGrouper(false);



        syriaChart
            .colors(['#4eb3d3'])
            .width(800)
           .height(400)
           .margins({top: 10, right: 75, bottom: 30, left: 75})
           .dimension(yearDim)
           .group(syrianRefugees)
           .transitionDuration(500)
            .x(d3.scale.linear().domain([2000, 2014]))
           .elasticY(true)
           .xAxisLabel("Year")
           .yAxis().ticks(4);




        dc.renderAll();

 }

 // .x(d3.scale.linear().domain([2000, 2014])).tickFormat(d3.format("d"));