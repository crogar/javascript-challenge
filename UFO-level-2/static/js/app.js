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

function populate_dropdowns(table_data)
{
    var options = d3.selectAll("select");
    options.each(function(d,i) {
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
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the value property of the input element
    var inputValue = d3.select("#datetime_").property("value");
    console.log(inputValue)
    // everytime the user request a new search, we'll empty the html content of tbody
    tbody.html("");
    var filteredData = tableData.filter(event => event.datetime === inputValue);
    if (filteredData.length === 0){
        var row = tbody.append('tr')
        row.append("tr").text("WOW I Can't believe no one remembers what happened that day, where was my camera when I needed the most!!!")
    }else{
        populate_table(filteredData);
    }
    // Resizing our stars div to cover only 75% of the screen height 
    var heights = window.innerWidth;
    d3.select(".stars").style.height = (heights*0.75) + "px";
    d3.select(".stars2").style.height = (heights*0.75) + "px";
    d3.select(".stars3").style.height = (heights*0.75) + "px";
    console.log(heights)
}

d3.selectAll("select").on("change", function() {
    // you can select the element just like any other selection
    var e = d3.select(this).attr("id");
    // var coin = e.options[e.selectedIndex].text;
    console.log(e)
  });

filter_btn.on("click",filter_events);
form.on("submit",filter_events);