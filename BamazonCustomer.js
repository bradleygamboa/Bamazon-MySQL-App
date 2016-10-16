// Required dependencies
var mysql = require('mysql');
var prompt = require('prompt');

// Setting up the connection to mySQL.
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Texas2670!',
	database: 'bamazon'
});