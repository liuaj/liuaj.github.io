// Alice Liu 2017
// Stores most Javascript for the website

var height = $('.col-sm-8 text-left').height();
    
$('.col-sm-2 sidenav').height(height);

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

    // array in which to store spice info
    var stock = new Array();

    // add spices
    stock.push(new Array("Allspice", "0.25", true));
    stock.push(new Array("Anise (Star)", "0.10", true));
    stock.push(new Array("Anise (Spanish)", "0.25", true));
    stock.push(new Array("Bay Leaves", "0.05", true));
    stock.push(new Array("Caraway", "N/A", false));
    stock.push(new Array("Cardamom", "0.10", true));
    stock.push(new Array("Cayenne (Ground)", "0.10", true));
    stock.push(new Array("Cloves", "0.05", true));
    stock.push(new Array("Coriander", "0.05", true));
    stock.push(new Array("Cream of Tartar", "0.50", true));
    stock.push(new Array("Cumin", "0.05", true));
    stock.push(new Array("Fenugreek (Leaves)", "0.10", true));
    stock.push(new Array("Ginger (Ground)", "0.05", true));
    stock.push(new Array("Nutmeg", "0.10", true));
    stock.push(new Array("Oregano", "0.05", true));
    stock.push(new Array("Peppercorn (White)", "0.25", true));
    stock.push(new Array("Rosemary", "0.10", true));
    stock.push(new Array("Thyme", "0.10", true));
    stock.push(new Array("Turmeric", "0.50", true));

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
        // create cells in row
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
                // placeholder value is 0 for all input cells
                inp.setAttribute("placeholder", 0);
                // disable input and color row red if out of stock
                if ((stock[i])[2] == false) { 
                    inp.disabled = "disabled"; 
                    tr.setAttribute("bgcolor", "ff7178");
                }
                var runFunc = "formDisp(" + i + "," + j + ")";
                inp.setAttribute("oninput", "formDisp()");
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

function formDisp() {
    var table = document.getElementById("spicetable");
    // temporary storage for the string with the correct, updated sum
    var temp = "Total: $";

    // iterate through rows of table
    var subtotal = 0;
    for (var i = 0, row; row = table.rows[i]; i++) {
        // iterate through columns
        for (var j = 0, col; col = row.cells[j]; j++) {
            // if third column (tsp) is not 0, add subtotal to sum
            if (j == 2) {
                // get number of tsp ordered
                var tspAmount = table.rows[i].cells[j].childNodes[0].value;
                if (tspAmount > 0) {
                    // get unit price
                    var unitPrice = parseFloat(table.rows[i].cells[j-1].innerHTML);
                    subtotal += tspAmount * unitPrice;
                    // window.alert("unit price" + unitPrice);
                }
                else { continue; }
            }
            else { continue; }
        }
    }  
    // round total to 2 decimal and append text beforehand
    document.getElementById("total").innerHTML = temp + subtotal.toFixed(2);
}

// iterates through table and feeds data on spice orders to the hidden form element
function tableCheck() {
    var table = document.getElementById("spicetable");
    // contains the eventual text output
    var output = "";
    for (var i = 0, row; row = table.rows[i]; i++) {
        var message = "";
        // iterate through columns
        for (var j = 0, col; col = row.cells[j]; j++) {
            // list out spice name and unit price, stored in first two columns
            if (j == 0 || j == 1) {
                // pull out text from cell
                var text = table.rows[i].cells[j].innerHTML;
                // if second column (unit price), format accordingly
                if (j == 1) { text = "$" + text + "/tsp"; }
                // separate column entries with semicolons
                message += (text + "; ");
            }
            // list out amount of spice needed if it has been ordered
            else {
                var tsp = col.childNodes[0].value;
                if (tsp > 0) {
                    message += (tsp + " tsp\n");
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
    // get value of total sum
    totalSum = document.getElementById("total").innerHTML;
    // append total sum to output
    output += totalSum + "\n";
    // change value of hidden button to the output
    $("#orders").val(output);
    // confirmation window for form
    window.confirm("Confirm order: \n" + output + 
        "A confirmation message will be sent to your email address.\n");
}

// updates the cc email to the entered email address
function changeEmail() {
    // get the email address from the form
    var email = document.getElementById("email").value;
    // change the _cc field's email to this email
    document.getElementById("cc").value = email;
}

