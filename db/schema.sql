DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db;;

CREATE TABLE department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(255) NOT NULL
);

CREATE TABLE job (
  job_id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  department_id INTEGER NOT NULL,
  salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  job_id INTEGER NOT NULL,
    FOREIGN KEY (job_id)
    REFERENCES job(job_id)
    ON DELETE CASCADE
);
