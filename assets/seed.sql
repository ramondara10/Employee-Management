--employee section
insert into employee(first_name, last_name, role_id, manager_id)values("John", "Doe", 1, 6);
insert into employee(first_name, last_name, role_id, manager_id)values("Mike","Chan", 5, 3); 
insert into employee(first_name, last_name, role_id, manager_id)values("Ashley", "Rodriguez", 6, 4);
insert into employee(first_name, last_name, role_id, manager_id)values("Kevin", "Tupik", 7, null);
insert into employee(first_name, last_name, role_id, manager_id)values("Malia", "Brown", 1, 6);
insert into employee(first_name, last_name, role_id, manager_id)values("Sarah", "Lourd", 4, 2);
insert into employee(first_name, last_name, role_id, manager_id)values("Tom", "Allen", 2, 2);
insert into employee(first_name, last_name, role_id, manager_id)values("Christian", "Eckenrode", 1, 6);

--employee section opposite way
insert into employee(first_name, last_name, role_id, manager_id)values("John", "Doe", 1, 4);
insert into employee(first_name, last_name, role_id, manager_id)values("Mike","Chan", 5, 6); 
insert into employee(first_name, last_name, role_id, manager_id)values("Ashley", "Rodriguez", 6, 7);
insert into employee(first_name, last_name, role_id, manager_id)values("Kevin", "Tupik", 7, null);
insert into employee(first_name, last_name, role_id, manager_id)values("Malia", "Brown", 1, 4);
insert into employee(first_name, last_name, role_id, manager_id)values("Sarah", "Lourd", 4, 5);
insert into employee(first_name, last_name, role_id, manager_id)values("Tom", "Allen", 2, 4);
insert into employee(first_name, last_name, role_id, manager_id)values("Christian", "Eckenrode", 1, 4);

--role section
insert into role(title, salary, department_id)values("Sales Lead", "100000.00", 1);
insert into role(title, salary, department_id)values("Salesperson", "80000.00", 2);
insert into role(title, salary, department_id)values("Lead Engineer","15000.00",2);
insert into role(title, salary, department_id)values("Software engineer","120000.00",3);
insert into role(title, salary, department_id)values("Accountant","125000",3);
insert into role(title, salary, department_id)values("Legal Team Lead","150000.00",3);
insert into role(title, salary, department_id)values("Lawyer","200000.00",3);

--department section 
insert into department (name) values("Sales");
insert into department (name) values("Engennering");
insert into department (name) values("Legal");