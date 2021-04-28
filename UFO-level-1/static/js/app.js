// from data.js
var tableData = data;

// YOUR CODE HERE!
var filter_btn = d3.select("#filter-btn")
var tbody = d3.select("#ufo-table > tbody")

// Populates the table with all the data in tableData
function populate_table(){
    tableData.forEach((ufo_event) => {
        var row = tbody.append("tr");
        Object.entries(ufo_event).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
}
populate_table()


function filter_events(){
    var date = d3.select("")
    console.log("clicked btn")
    console.log(d3.event.target);
}


filter_btn.on("click",filter_events);