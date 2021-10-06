const inquirer = require('inquirer');
const ctable = require('console.table');
const express = require('express');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false }));
app.use(express.json())

const db =  mysql.createConnection(
  {
    host: 'localhost',
    user: 'dan',
    password: '5683',
    database: 'roster_db'

    //this is not a personal account or pass.
  },
  console.log(`Connected to the roster_db database`)
)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

async function confirm(){
  const confirm = await inquirer.prompt({type: 'confirm', name: 'continue', message: 'Return to the home screen? (\'n\' to exit app)'})
  console.log(confirm)

  if(confirm.continue === true){
    getService();
  }
  else{
    console.log('Thank you for using my Database')
    process.exit();
  }
}

function EmpTable(){
  db.query('SELECT Emp_id, first_name, last_name, department.Dep_name, test.Role_title, test.salary, manager_id FROM employee INNER JOIN test ON test.Role_id = employee.role_id INNER JOIN department ON department.Dep_id = test.department_id', function(err, result){
                        
    console.table('Employees', result)
    confirm()
  })
}

async function RolTable(){
  db.query('SELECT Role_id, Role_title, salary, department.Dep_name FROM test INNER JOIN department ON test.department_id = department.Dep_id', function(err, result){//This db query runs correctly in MySQL workbench, but for some reason gives me incorrect id #s in this call
    console.log(result) 
    console.table('Roles', result)
    confirm()
  })  
}

function DepTable(){
  db.query('SELECT * FROM department', function(err, result){
                       
    console.table('Departments', result)
    confirm()
  })
}
async function AddDep(){
  let info = await inquirer.prompt(
    
    {
      type: 'input',
      name: 'DepName',
      message: 'Please enter the name of the new department.'
    }
    
  )
  
  let name = info.DepName
    console.log(info.DepName)
  db.query(`INSERT INTO department(Dep_name) VALUES (?);`, name, (err, result) => {
    if (err){
      console.log(err);
    }
    console.log(result)
    confirm()
  })
}

async function AddRole(){
  let info =  await inquirer.prompt([
   
    {
      type: 'input',
      name: 'title',
      message: 'Please enter the title of the role.'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please enter the salary of this role.'
    },
    {
      type: 'input',
      name: 'depID',
      message: 'Please enter the Department Id.'
    }]
    )
  
  let title = info.title
  let salary = parseInt(info.salary)
  let depID =info.depID
  
  db.query(`INSERT INTO test(Role_title, salary, department_id) VALUES (?,?,?);`, [title, salary, depID], (err, result) => {
    if (err){
      console.log(err);
    }
    console.log(result)
                        
    
    confirm()
  })
}
async function AddEmp(){
  let info =  await inquirer.prompt([
    
    {
      type: 'input',
      name: 'Fname',
      message: 'Enter the employees first name.'
    },
    {
      type: 'input',
      name: 'Lname',
      message: 'Enter the employees last name.'
    },
    {
      type: 'input',
      name: 'role',
      message: 'Enter this employees role id.'
    },
    {
      type: 'input',
      name: 'MID',
      message: 'Please enter the employees manager number (0 if none).'
    }]
  )
    
    let Fname = info.Fname
    let Lname = info.Lname
    let role = info.role
    let manager_id = info.MID
   
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, [Fname, Lname, role, manager_id], (err, result) => {
    if (err){
      console.log(err);
    }
    console.log(`${Fname,' ',Lname} was added to the db`)
                        
    
    confirm()
  })
}

async function UpRole(){
  const init = await inquirer.prompt(
    [{
      type: 'input',
      name:'EmpID',
      message:'Enter the employee id number'
    },
    {
      type: 'input',
      name:'RoleID',
      message:'Enter the new role id'
    }]
  )

  id = init.EmpID;
  role = init.RoleID;
  db.query('UPDATE employee SET role_id = (?) WHERE id = (?)',[id,role], (res,err) => {
    if(err){
      console.log(err)
    }
    console.log(`Employee #${id} updated to role #${role}`)
  })
  confirm()
}

async function getService(){
  const init = await inquirer.prompt(
    {
      type: 'checkbox',
      name: 'service',
      choices: ['View all departments','View all roles','View all employees', 'Add a department','Add a role','Add an employee','Update an employee role']
    }
  )

  
  if(init.service[0] === 'View all departments'){
    console.log(init.service[0], 'working')
    DepTable()
  }
  else if(init.service[0] === 'View all roles'){
    console.log(init.service[0], 'working')
    RolTable()
  }
  else if(init.service[0] === 'View all employees'){
    console.log(init.service[0], 'working')
    EmpTable()
  }
  else if(init.service[0] === 'Add a department'){
    console.log(init.service[0], 'working')
    AddDep()
    
  }
  else if(init.service[0] === 'Add a role'){
    console.log(init.service[0], 'working')
    AddRole()
  }
  else if(init.service[0] === 'Add an employee'){
    console.log(init.service[0], 'working')
    AddEmp()
  }
  else if(init.service[0] === 'Update an employee role'){
    console.log(init.service[0], 'working')
    UpRole()
  }
  else{
    console.log('Thank you for using my database')
    process.exit()
  }

};

  app.use((req, res) => {
    res.status(404).end();

  });

 getService() 