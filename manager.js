var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  //port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASS,
  database: "trashytrinkets_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

function start() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "Would you like to [View Products for Sale], [View Low Inventory], [Add to Inventory], or [Add a New Product]?",
      choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add a New Product", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the functions
      if (answer.options === "View Products") {
        viewProducts();
      }
      else if(answer.options === "View Low Inventory") {
        viewInventory();
      }
      else if(answer.options === "Add to Inventory") {
        addInventory();
      }
      else if(answer.options === "Add a New Product") {
        addProduct();
      } else{
        connection.end();
      }
    });
}


//function that shows table items with prices and IDs
function viewProducts() {
    connection.query(
        "SELECT item_id, product_name, price, stock_quantity FROM inventory;",
    
        function(err, results) {
          if (err) throw err;
          console.table(results);

          start();
        }
      );
}

//function that shows all items with inventory lower than 5
function viewInventory() {
    connection.query(
        "SELECT item_id, product_name, stock_quantity FROM inventory WHERE stock_quantity < 5",
    
        function(err, results) {
          if (err) throw err;

          if(results == []){
            console.log("Looks like we're fully stocked. Better send Bill to find grab customers.")
        } else {
        
            console.table(results);
        }
          start();
        }
    );
}

//function that shows all items with inventory lower than 5
function addInventory() {
    inquirer
    .prompt([
        {
        name: "itemID",
        type: "input",
        message: "What is the ID of the item that you would like to add inventory for?"
        },
        {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
        }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE inventory SET stock_quantity = stock_quantity + " + answer.quantity + " WHERE item_ID = " + answer.itemID,
    
        function(err) {
          if (err) throw err;

          console.log("Inventory successfully updated! Better start looking for a peg for Bill.");

          start();
        }
     )
    }
    )
}

function addProduct() {
    inquirer
    .prompt([
        {
        name: "product",
        type: "input",
        message: "What is the name of the new product Bill hauled in?"
        },
        {
        name: "quantity",
        type: "input",
        message: "How many are we adding to the store?"
        },
        {
        name: "department",
        type: "input",
        message: "What department does it belong in?"
        },
        {
        name: "price",
        type: "input",
        message: "What's it sell for?"
        }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO inventory (product_name, stock_quantity, department_name, price) VALUES ('" + answer.product + "', " + answer.quantity + ", '" + answer.department + "', " + answer.price + ")",
    
        function(err) {
          if (err) throw err;

          console.log("Inventory successfully updated! Might want to add peg legs to the menu soon.");

          start();
        }
     )
    }
    )
}

