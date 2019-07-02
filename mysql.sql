DROP DATABASE IF EXISTS trashytrinkets_DB;
CREATE DATABASE trashytrinkets_DB;

USE trashytrinkets_DB;

CREATE TABLE inventory(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DEC (10,2) default 0,
  stock_quantity INT default 0,
  product_sales DEC (10,0),
  PRIMARY KEY (item_id)
);
INSERT INTO inventory(product_name, department_name, price, stock_quantity)
VALUES("half-chewed gum", "consumables", 0.20, 20),
("moldy grapefruit", "consumables", 0.99, 5), 
("very short rope", "first aid", 5.99, 10),
("elmers glue", "first aid", 3.99, 7),
("hairy skull", "voodoo shit", 1.00, 8),
("broken broom", "weapons", 10.99, 2),
("spoon with a sharpened handle", "weapons", 15.99, 30),
("left shoe", "I want to go outside", 8.99, 20),
("broken compass", "I want to go outside", 0.20, 3),
("ladder with mising rungs", "I want to go outside", 8.99, 15),
("lightly used tampon", "hygiene", 0.69, 15),
("two-tooth comb", "hygiene", 4.99, 10),
("half-full Diet Pepsi", "expired beverages", 5.99, 15),
("dented coke can", "expired beverages", 9.99, 15);

SELECT * FROM inventory;

USE trashytrinkets_DB;

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_costs DEC (10,2) default 5.00,
  PRIMARY KEY (department_id));