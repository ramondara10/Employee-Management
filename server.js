const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/database");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootmysql07!",
  database: "employee_managerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Employee Tracker  on ID ${connection.threadId}\n`);
  welcomePrompt();
});

welcomePrompt = () => {
  console.log(`connected as id ${connection.threadId}`);
  const welcomeText = `-------------------------------------------
    ####### #     # ######  #       ####### #     # ####### #######    
    #       ##   ## #     # #       #     #  #   #  #       #          
    #       # # # # #     # #       #     #   # #   #       #          
    #####   #  #  # ######  #       #     #    #    #####   #####      
    #       #     # #       #       #     #    #    #       #          
    #       #     # #       #       #     #    #    #       #          
    ####### #     # #       ####### #######    #    ####### #######    
                                                                        
        ##   ##    #     #     #    #     #######   #######  #####
        # # # #   # #    ##    #   # #   #          #       #     #
        #  #  #  #   #   # #   #  #   #  #          #       #    #
        #     # #######  #  #  # ####### #  ######  #####   #####
        #     # #     #  #   # # #     # #       #  #       #    #
        #     # #     #  #    ## #     # #       #  #       #     #
        #     # #     #  #     # #     #  #######   ####### #      #
    ---------------------------------------------------------------
    `;

  console.log("\x1b[34m", welcomeText);
  startup();
};

function startup() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "currentAction",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
          ],
        },
      ])
      .then((response) => {
        //console.log(response);
        //set up cases to do each of the things
        switch (response.currentAction) {
          case "View All Departments":
            //console.log("view all dpt");
            viewAllDepartments();
            break;
          case "View All Roles":
            //console.log("view all roles");
            viewAllRoles();
            break;
          case "View All Employees":
            //console.log("view all employees");
            viewAllEmployees();
            break;
          case "Add A Department":
            //console.log("add dpt");
            addDepartment();
            break;
          case "Add A Role":
            //console.log("Add role");
            addRole();
            break;
          case "Add An Employee":
            //console.log("add employee");
            addEmployee();
            break;
          case "Update An Employee Role":
            //console.log("update employee");
            updateEmployee();
        }
      });
  }
  
  function viewAllDepartments() {
    //build the sql query
    db.query(`SELECT * FROM department`, function (err, results, fields) {
      //console.log(results);
      console.table(results); //<== this is what we are interested in
      //console.log(fields);
      startup();
    });
  }
  
  function viewAllRoles() {
    //build the sql query
    db.query(`SELECT * FROM role`, function (err, results, fields) {
      console.table(results); //<== this is what we are interested in
      //console.log(fields);
      startup();
    });
  }
  
  function viewAllEmployees() {
    //build the sql query
    db.query(`SELECT * FROM employee`, function (err, results, fields) {
      console.table(results); //<== this is what we are interested in
      //console.log(fields);
      startup();
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "What is the name of the department?",
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO department(name) VALUES(?)`,
          [answers.departmentName],
          function (err, results, fields) {
            //console.log(results);
            startup();
          }
        );
      });
  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the role?",
        },
        {
          type: "input",
          name: "roleDepartment",
          message: "What department does this role belong to?",
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`,
          [answers.roleName, answers.roleSalary, answers.roleDepartment],
          function (err, results, fields) {
            //console.log(results);
            startup();
          }
        );
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the last name?",
        },
        {
          type: "input",
          name: "role",
          message: "What is the role?",
        },
        {
          type: "number",
          name: "manager",
          message: "What who is the manager(Press enter for none)?",
        },
      ])
      .then((answers) => {
        let paramArray = [];
        if (answers.manager) {
          paramArray = [
            answers.firstName,
            answers.lastName,
            answers.role,
            answers.manager,
          ];
  
          db.query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
            paramArray,
            function (err, results, fields) {
              //console.log(results);
              startup();
            }
          );
        } else {
          paramArray = [answers.firstName, answers.lastName, answers.role];
          db.query(
            `INSERT INTO employee(first_name, last_name, role_id) VALUES(?,?,?)`,
            paramArray,
            function (err, results, fields) {
              //console.log(results);
              startup();
            }
          );
        }
      });
  }
  
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "number",
          name: "employeeId",
          message: "Which employee would you like to update?",
        },
        {
          type: "number",
          name: "newRole",
          message: "What is the new role?",
        },
      ])
      .then((answers) => {
        db.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [answers.newRole, answers.employeeId], // 1 "1"
          function (err, results, fields) {
            //console.log(results);
            startup();
          }
        );
      });
  }
  startup();