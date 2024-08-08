--drop existing database with same name--
DROP DATABASE IF EXISTS employee_tracker_db;

-- create new database--
CREATE DATABASE employee_tracker_db;

--enter the database--
\c employee_tracker_db;;

--create department table/columns--

CREATE TABLE department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(255) NOT NULL
);

--create job table/columns --
CREATE TABLE job (
  job_id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  department_id INTEGER NOT NULL,
  salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(department_id)
        ON DELETE CASCADE
);

--create employee table/columns--
CREATE TABLE employee (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  job_id INTEGER NOT NULL,
    FOREIGN KEY (job_id)
    REFERENCES job(job_id)
    ON DELETE CASCADE,
  manager_id INTEGER,
  CONSTRAINT fk_manager 
    FOREIGN KEY( manager_id) 
    REFERENCES employee(employee_id) 
    ON DELETE SET NULL
);
