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
console.log("Welcome to Bamazon!");
console.log("Here is what we have for sale:");
console.log(" ");
// Displays items from Products table
conn.query('SELECT * FROM products', function(err, rows) {
    if (err) throw err;
    // Console.log all the items for sale
    for (var i = 0; i < rows.length; i++) {
        console.log("Item ID: " + rows[i].itemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price);
    };
});
