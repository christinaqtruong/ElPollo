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
  
  //list items
  itemsForSale();
 
});

//function that shows table items with prices and IDs
function itemsForSale() {
    connection.query(
        "SELECT item_id, product_name, price FROM inventory;",
    
        function(err, results) {
          if (err) throw err;
          console.log(err);

          console.log(results);

          purchase();
        }
      );
}

// function for user to purchase items
function purchase() {
  inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "What is the ID of the item that you would like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, check item inventory for item
      connection.query(
        "SELECT stock_quantity FROM inventory WHERE item_id= " + answer.itemID,
        function(err, result) {

            if (err) throw err;
    
            var quantity = answer.quantity;
            var itemID = answer.itemID;
            console.log(quantity);
            if (quantity > result[0].stock_quantity){
              console.log("Oh no! Looks like we don't have enough in stock for your order. We'll try to get some more as soon as we can get Bill's tibia back in his leg.");
  
                connection.end();
         
            } else {
              connection.query(
                "UPDATE inventory SET stock_quantity = stock_quantity - " + quantity + " WHERE item_ID = " + itemID,
                console.log("Inventory updated!"),
            
                function(error) {
                    if (error) throw error;
                    connection.query(
                      "SELECT price FROM inventory WHERE item_ID = " + itemID,

                      function(err, answer) {
                        if (err) throw err;
                        
                        var total = answer[0].price * quantity;
                        console.log("Thanks for your purchase! You owe $" + total + ". Pay today or you won't see tomorrow. We hope to see you again!")
                      }

                    )
                    connection.end();
                }
              )

              
            }
      }
      )
    }
    )
}

