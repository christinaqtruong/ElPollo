//create database using SQL
USE trashytrinkets_DB;

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_costs DEC (10,2) default 5.00,
  PRIMARY KEY (department_id));

//modify inventory table from trashytrinkets_DB to add another column
ALTER TABLE inventory 
ADD product_sales varchar(250);

//grab quantity * price of item and add to product_sales column when customer chooses to purchase inventory and inventory is in stock
INSERT INTO inventory (product_sales)
VALUES (/*variable holding total*/)

//Run application to view product sales by department and create a new department
function start() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "Would you like to [View Product Sales by Department] or [Create New Department]?",
        choices: ["View Product Sales", "Create New Department", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the functions
        if (answer.options === "View Product Sales") {
          viewProductSales();
        }
        else if(answer.options === "Create New Department") {
          createNewDepartment();
        } else{
          connection.end();
        }
      });
    }

//create functions to fulfill inquirer options
function viewProductSales(){
    connection.query(
        "SELECT product_sales FROM inventory WHERE department(*)",
        function(err, results) {

            if (err) throw err;
    
            console.log(results);
            start();
        }
    )
}

function createNewDepartment(){
    inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department that you would like to create?"
      }
    ])
    .then(function(answer) {
        connection.query(
        "INSERT INTO department_name FROM departments VALUES( " + answer.department + ")",
        function(err, results) {

            if (err) throw err;
    
            console.log("You've successfully created a new department! Bill will be so thrilled.");
            start();
        }
        )
    })
}
        