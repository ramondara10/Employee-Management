const mysql = require("mysql")
const inquirer = require("inquirer")
const table = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootmysql07!",
    database: "employee_managerDB"
})

connection.connect(function (err) {
    if (err) {
        console.error("error connecting:" + err.stack);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
    const welcomeText = `---------------------------------------------------------------
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
    `

    console.log("\x1b[34m", welcometext)
    start();
});

const start = () => {

    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices:
            [
                "View All Employees", "View Employees By Department", "View Employees By Role",
                "View Employees by Manager", "Add Employee", "Remove Employee", "Update Employee",
                "View All Roles", "Add Role", "Remove Role",
                "View All Departments", "Add Department", "Remove Department", "View Budget Allocated to Payroll"
            ]
    }).then((choice) => {
        
        if (choice.menu === "View All Employees") allEmployees();
        if (choice.menu === "View Employees By Department") allEmpByDept();
        if (choice.menu === "View Employees By Role") allEmpByRole();
        if (choice.menu === "View Employees by Manager") allEmpByMan();
        if (choice.menu === "Add Employee") addEmp();
        if (choice.menu === "Remove Employee") deleteEmp();
        if (choice.menu === "Update Employee") updateEmp();
        if (choice.menu === "View All Roles") allRoles();
        if (choice.menu === "Add Role") addRole();
        if (choice.menu === "Remove Role") deleteRole();
        if (choice.menu === "View All Departments") allDep();
        if (choice.menu === "Add Department") addDep();
        if (choice.menu === "Remove Department") deleteDep();
        if (choice.menu === "View Budget Allocated to Payroll") usedBudget();

    })
}

//Arrays by category

//role section
const roleArr = (res) => {

    const roles = [];
    res.map(obj => {
        let newObj = {
            name: obj.id + ". " + obj.title,
            value: {
                id: obj.id,
                title: obj.title,
                salary: obj.salary,
                department_id: obj.department_id
            }
        }
        roles.push(newObj)
    })
    return roles;
}
//manager section
const managerArr = (res) => {

    const managers = [];
    res.map(obj => {
        let newObj = {
            name: obj.id + ". " + obj.first_name + " " + obj.last_name,
            value: {
                id: obj.id,
                first_name: obj.title,
                last_name: obj.salary
            }
        }
        managers.push(newObj)
    })
    return managers;
}

//employee section
const empArr = (res) => {
    const employees = [];
    res.map(obj => {
        let newObj = {
            name: obj.id + ". " + obj.first_name + " " + obj.last_name,
            value: {
                id: obj.id,
                first_name: obj.first_name,
                last_name: obj.last_name,
                role_id: obj.role_id,
                managers_id: obj.manager_id
            }
        };
        employees.push(newObj)
    })
    return employees;

}