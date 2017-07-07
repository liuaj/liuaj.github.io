
// // Lists to store spice names and corresponding prices
// var spicenames = ["Allspice", "Anise (Star)", "Anise (European)"];
// var spiceprices = [0.50, 0.25, 0.50];

// Create a list of "dictionaries to store spice names and prices
var spices = [
	{name: "Allspice",
	price: "0.50",
	here: true},

	{name: "Anise (Star)",
	price: "0.25",
	here: true},

	{name: "Anise (European)",
	price: "0.50",
	here: true},
];

// var spicetable = 
//   "<table class='table table-hover'>
//     <thead>
//       <tr>
//         <th>SPICE</th>
//         <th>PRICE/TSP ($)</th>
//       </tr>
//     </thead>
//     <tbody>";

// for (elt in spices) {
//       spicetable += "<tr>
//         <td>elt["name"]</td>
//         <td>elt["price"]</td>
//       </tr>"
//     };

// spicetable += "</tbody></table>";

// adapted from stackoverflow.com
function addTable() {
    var myTableDiv = document.getElementById("metric_results");
    var table = document.createElement('TABLE');
    table.className = 'table table-hover';
    var tableBody = document.createElement('TBODY');

    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "SPICE";
    heading[1] = "PRICE ($/tsp)";
    heading[2] = "QUANTITY (tsp)";

    var stock = new Array();
    stock[0] = new Array("Allspice", "0.50", true);
    stock[1] = new Array("Anise (Star)", "0.25", true);
    stock[2] = new Array("Anise (European)", "0.50", true);

    // create columns
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }

    // create rows
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < stock[i].length; j++) {
        	var td = document.createElement('TD');

        	// create a counter in the third column
        	if (j == stock[i].length - 1) {
                // set width of td
                td.width = "20%";
                var inp = document.createElement('INPUT');
                inp.class = "form-control"; 
                inp.type = "number";   
                inp.min = 0;
                inp.val = 0;
                inp.placeholder = 0;
                inp.id = i;
        		td.appendChild(inp);
        	}
        	// fill in the other columns with regular elements
        	else {
                td.width = "40%";
                var cell = document.createTextNode(stock[i][j]);
                cell.id = stock[i][j];
	            td.appendChild(cell);
        	}
        	tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }  
    myTableDiv.appendChild(table);
}

$("#submit").click(function() {
    // var $row = $(this).closest("tr"),
    //     $tds = $row.find("td");

    // $.each($tds, function() {
    //     console.log($(this).text());
    //   });

    document.write("hello");
    document.write("<a href=mailto:alice.liu.130@gmail.com?subject='subject'&body='body'></a>")
    });

