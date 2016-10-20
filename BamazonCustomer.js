// Required dependencies
var mysql = require('mysql');
var prompt = require('prompt');

// Setting up the connection to mySQL
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'bradleyg',
    password: 'WhoeverGradesThisIsAwesome1234!',
    database: 'bamazon'
});
// Starts mysql connection and prompt
conn.connect();
prompt.start();

// First message to customer
console.log(" ");
console.log("Welcome to Bramazon!");
console.log("Here is EVERYTHING we have for sale jk not really:");
console.log(" ");
// Displays items from Products table
conn.query('SELECT * FROM products', function(err, rows) {
    if (err) throw err;
    // Console.log all the items for sale
    for (var i = 0; i < rows.length; i++) {
        console.log("Item ID: " + rows[i].itemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price);
    };
    var schema = {
            properties: {
                itemid: {
                    description: 'Whats is the ID of the item you want?'
                },
                quantity: {
                    description: 'How many do you need?'
                }
            }
        }
        // Ask the customer what they want to buy and how much.
    prompt.get(schema, function(err, result) {
        // If customer asks for more items than avaliable
        if (rows[result.itemid - 1].StockQuantity < result.quantity) {
            console.log("Insufficient Quantity");
            conn.end();
            // When there is enough items in stock
        } else {
            // Total for the customer
            var orderPrice = (rows[result.itemid - 1].Price * result.quantity);
            var department = rows[result.itemid - 1].DepartmentName;
            console.log("Your total is: $" + orderPrice);
            console.log("Thanks you, come again!");
            conn.end();

            // Update the stock for the item.
            var newQuantity = ( rows[result.itemid - 1].StockQuantity - result.quantity);
            conn.query('UPDATE products SET StockQuantity=' + newQuantity + ' WHERE ItemID=' + result.itemid + ';', function(err, res) {
                if (err) throw err;
                conn.end();
            });

        };
    });
});
