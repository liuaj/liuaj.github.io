
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

// adapted from stackoverflow.com
function addTable() {
    var myTableDiv = document.getElementById("jstable");
    var table = document.createElement('TABLE');
    table.className = 'table table-hover';
    table.id = "spicetable";
    var tableBody = document.createElement('TBODY');

    table.appendChild(tableBody);

    // create headings
    var heading = new Array();
    heading[0] = "SPICE";
    heading[1] = "PRICE ($/tsp)";
    heading[2] = "QUANTITY (tsp)";

    // add spices
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
                inp.value = 0;
                inp.placeholder = 0;
                inp.id = i;
                inp.onChange = "formDisp(" + i + ")";
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

// function to update the page near the Submit button every time a new input is entered
function formDisp(index) {
    if (index == undefined) {
        index = 0;
    }
    // // loop through rows of main table
    // var table = document.getElementById("mainTable");
    // var spiceList = "";
    // for (var i = 0, row; row = table.rows[i]; i++) {
    //     spiceList += row;
    // }
    // document.getElementById("outList").innerHTML = spiceList;
    else {
        var quant = $(this).val();
        var name = stock[index][0];
        var price = stock[index][1];
        var alltext = quant + " tsp of " + name + " w/ unit price " + price;
        $("#orders").val(alltext);
    }
}

function tableCheck() {
    var table = document.getElementById("spicetable");
    // contains the eventual text output
    var output = "";
    for (var i = 0, row; row = table.rows[i]; i++) {
        var message = "";
        // iterate through columns
        for (var j = 0, col; col = row.cells[j]; j++) {
            // list out spice name and unit price
            if (j == 0 || j == 1) {
                // pull out text from cell
                var text = table.rows[i].cells[j].innerHTML;
                message += (text + "; ");
            }
            // list out amount of spice needed if it has been ordered
            else {
                if (col.childNodes[0].value > 0) {
                    message += (col.childNodes[0].value + "\n");
                }
                else {
                    message = "";
                }
            }
        }  
        output += message;
    }
    $("#orders").val(output);
}

