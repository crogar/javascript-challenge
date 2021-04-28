// from data.js
var tableData = data;

// Select submit button
var filter_btn = d3.select("#filter-btn");
// Select the form
var form = d3.select("form");
// Select table body
var tbody = d3.select("#ufo-table > tbody")

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
populate_table(tableData);


function filter_events(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the value property of the input element
    var inputValue = d3.select("#datetime").property("value");
    console.log(inputValue)
    // everytime the user request a new search, we'll empty the html content of tbody
    tbody.html("");
    var filteredData = tableData.filter(event => event.datetime === inputValue);
    if (filteredData.length === 0){
        var row = tbody.append('tr')
        row.append("tr").text("WOW I Can't believe no one remembers what happened that day, where was my camera whe I needed the most!!!")
    }else{
        populate_table(filteredData);
    }
}


filter_btn.on("click",filter_events);
form.on("submit",filter_events);