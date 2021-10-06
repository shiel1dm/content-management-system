DROP DATABASE IF EXISTS roster_db;
CREATE DATABASE roster_db;

USE roster_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
  Dep_id INT AUTO_INCREMENT PRIMARY KEY,
  Dep_name VARCHAR(30)
);


DROP TABLE IF EXISTS test;
CREATE TABLE test(
  Role_id INT AUTO_INCREMENT PRIMARY KEY,
  Role_title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(Dep_id)
  

);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
  Emp_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES test(Role_id)
  
     
);


