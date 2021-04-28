// from data.js
var tableData = data;

// YOUR CODE HERE!
var filter_btn = d3.select("#filter-btn")
var tbody = d3.select("#ufo-table")
function populate_table(){

}



function filter_events(){
    console.log("clicked btn")
    console.log(d3.event.target);
}


filter_btn.on("click",filter_events);