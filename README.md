###DASHBOARD for REFUGEES & DISPLACED PERSONS

###INTRO
This website comprises key data from the United Nations High Commissioner for Refugees.
It displays charts associated with the data.

###FEATURES
- Bar Chart
- Pie Chart 
- Number Display
- Row Chart


###TECH/FRAMEWORKS/LIBRARIES USED
— D3.js
- DC.js
- Crossfilter
- Queue
- Keen 
- Intro
- JSON
- JQuery
- MongoDB
- Python
- Flask
- HTML5
- CSS3
- Bootstrap


###USAGE
    syriaChart
       .width(1300)
       .height(500)
       .margins({top: 10, right: 75, bottom: 30, left: 75})
       .dimension(yearDim)
       .group(syrianRefugees)
       .transitionDuration(500)
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxisLabel("Number of Syrians")
       .yAxis().ticks(5)
    syriaChart.xAxis().tickFormat(d3.format('d'));
    syriaChart.x(d3.scale.linear().domain([1955,2015]));
   
This allows the user to see the data in a bar chart, and interpret the
   information appropriately.
   

###TESTS

###GETTING HELP
If you encounter a glitch, or would like to see an improvement, please feel free to reach out: cmmc [ at ] protonmail [dot] ch 

###LICENSE
MIT &#169 Colleen McAuley

###ACKNOWLEDGMENTS and SPECIAL THANKS
- Code Institute Class
- Brian
- Richard
- Rosario
- Niel
- Tiff
- Denise
- Jim




