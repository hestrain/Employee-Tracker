
SELECT employee.first_name, employee.last_name, employee.job_id, job.title, job.department_id, department.department_name
FROM employee
INNER JOIN job ON employee.job_id = job.job_id
INNER JOIN department on job.department_id = department.department_id;
