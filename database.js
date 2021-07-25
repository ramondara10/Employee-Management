const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootmysql07!",
    database: "employee_managerDB"
});

console.log("connection successfull");

module.exports = connection;