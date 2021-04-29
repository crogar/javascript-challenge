// from data.js
var tableData = data;

// Select submit button
var filter_btn = d3.select("#filter-btn");
// Select the form
var form = d3.select("form");
// Select table body
var tbody = d3.select("#ufo-table > tbody")
// Var to store the current selected filters
var filters = []

// Populates the table with all the data in tableData
function populate_table(table_data){
    table_data.forEach((ufo_event) => {
        var row = tbody.append("tr");
        Object.entries(ufo_event).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
}

function populate_dropdowns(table_data,index)
{
    var options = d3.selectAll("select");
    options.each(function(d,i) {
        d3.select(this).html("")
        d3.select(this).append("option").text("Any")
        var category = d3.select(this).attr("id");
        var results = table_data.map(element => element[category])
        var uniq = [...new Set(results)];
        if (category != "datetime"){
            uniq.sort();
        }
        // console.log(uniq)
        uniq.forEach((option_select)=>{
            var selector = d3.select("#"+category)
            var option = selector.append("option")
            option.text(option_select)
        });
      });
}

// This function will run when the whole html page completely loads 

window.onload = function() {
    populate_table(tableData);
    populate_dropdowns(tableData);
    console.log("I'm all ready, yeah!!")
};


function filter_events(){
    // console.log(value)
    var filteredData = tableData
    var options = d3.selectAll("select");
    for(var i=0;i<filters.length;i++){
        console.log(options["_groups"][0][i].id)
        if(filters[i]=="Any"){
            continue
        }
        filteredData = filteredData.filter(event => event[options["_groups"][0][i].id] === filters[i]);
        console.log(filteredData)
    }
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the value property of the input element
    // everytime the user request a new search, we'll empty the html content of tbody
    tbody.html("");
    // populate_dropdowns(filteredData,obj)
    
    populate_table(filteredData)
    // Resizing our stars div to cover only 75% of the screen height 
    var heights = window.innerWidth;
    d3.select(".stars").style.height = (heights*0.75) + "px";
    d3.select(".stars2").style.height = (heights*0.75) + "px";
    d3.select(".stars3").style.height = (heights*0.75) + "px";
    // console.log(heights)
}

d3.selectAll("select").on("change", function() {
    // obtaining the value that has changed
    var value = this.options[this.selectedIndex].text;
    var index = this.options[this.selectedIndex].index;
    var selected_filters = d3.selectAll("select")
    // filter_events(obj,index,value );
    selected_filters.each(function(d,i) {
        filters[i] = this.options[this.selectedIndex].text;
      });
    console.log(filters)
    filter_events();
  });
