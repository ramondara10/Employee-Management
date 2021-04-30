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
