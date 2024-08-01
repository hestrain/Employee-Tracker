
-- SELECT employee.first_name, employee.last_name, employee.job_id, job.title, job.department_id, department.department_name
-- FROM employee
-- INNER JOIN job ON employee.job_id = job.job_id
-- INNER JOIN department on job.department_id = department.department_id;

SELECT job.job_id, job.title, department.department_name 
AS department, job.salary FROM job 
LEFT JOIN department on job.department_id = department.department_id;
