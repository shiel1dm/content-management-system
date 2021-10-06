INSERT INTO department(Dep_name)
VALUES  ('DepOne'),
        ('DepTwo');
        

INSERT INTO test(Role_title, salary, department_id)
VALUES  ('DEP1Manager', 200000, 1),
        ('Sales', 45000, 1),
        ('DEP2Manager', 200000, 2),
        ('Warehouse', 50000, 2);
        


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John','Doe', 2, 2),
        ('Steve','Yzerman', 3, 0),
        ('Robin','Lehner', 4, 4),
        ('Nick','Lidstrom', 1, 0);
        

