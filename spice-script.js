// Alice Liu 2017
// Stores most Javascript for the website

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
                // adding attributes to the input cell
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
            // add each td to the table
        	tr.appendChild(td);
        }
        // add the entire tr to the table
        tableBody.appendChild(tr);
    }  
    // append table so it can be displayed
    myTableDiv.appendChild(table);
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
                    // don't display the row data if no spice is ordered
                    message = "";
                }
            }
        }  
        // add the row's data to the value to be outputted if necessary
        output += message;
    }
    // change value of hidden button to the output
    $("#orders").val(output);
    window.alert(output);
}

