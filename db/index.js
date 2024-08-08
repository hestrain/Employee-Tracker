
const pool = require('./connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // Find all employees, join with jobs and departments to display their jobs, salaries, departments
   findEmployees() {
    return this.query(`
        SELECT employee.employee_id, employee.first_name, employee.last_name, employee.job_id, employee.manager_id, job.title, job.salary, job.department_id, department.department_name
        FROM employee
        INNER JOIN job ON employee.job_id = job.job_id
        INNER JOIN department on job.department_id = department.department_id;`);
  }

  //NOT CURRENTLY IN USE, TO WORK ON LATER
  // Find all employees except the given employee id
  findPossibleManagers(employeeId) {
    return this.query(
      'SELECT employee_id, first_name, last_name FROM employee WHERE employee_id != $1',
      [employeeId]
    );
  }

  // Create a new employee
  createEmployee(employee) {
    const { first_name, last_name, job_id} = employee;
    return this.query(
      'INSERT INTO employee (first_name, last_name, job_id) VALUES ($1, $2, $3)',
      [first_name, last_name, job_id]
    );
  }

  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.query(`DELETE FROM employee WHERE employee_id = $1`, [employeeId]);
  }

  // Update the given employee's job
  updateEmployeeJob(employeeId, jobId) {
    return this.query('UPDATE employee SET job_id = $1 WHERE employee_id = $2', [
      jobId,
      employeeId,
    ]);
  }

  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.query('UPDATE employee SET manager_id = $1 WHERE employee_id = $2', [
      managerId,
      employeeId,
    ]);
  }

  // Find all jobs, join with departments to display the department name
  findJobs() {
    return this.query(
`SELECT job.job_id, job.title, department.department_name 
AS department, job.salary FROM job 
LEFT JOIN department on job.department_id = department.department_id;`    );
  }

  // Create a new job
  createJob(job) {
    const { title, salary, department_id } = job;
    return this.query(
      'INSERT INTO job (title, salary, department_id) VALUES ($1, $2, $3)',
      [title, salary, department_id]
    );
  }

  // Remove a job from the db
  removeJob(jobId) {
    return this.query('DELETE FROM job WHERE job_id = $1', [jobId]);
  }

  // Find all departments
  findDepartments() {
    return this.query('SELECT department.department_id, department.department_name FROM department;');
  }

  // Create a new department
  createDepartment(department_name) {
    return this.query('INSERT INTO department (department_name) VALUES ($1)', [
      department_name
    ]);
  }

  // Remove a department
  removeDepartment(departmentId) {
    return this.query('DELETE FROM department WHERE department_id = $1', [departmentId]);
  }

  // Find all employees in a given department, join with jobs to display job titles
  findEmployeesByDepartment(departmentId) {
    return this.query(
      'SELECT employee.employee_id, employee.first_name, employee.last_name, job.title FROM employee LEFT JOIN job on employee.job_id = job.job_id LEFT JOIN department on job.department_id = department.department_id WHERE department.department_id = $1;',
      [departmentId]
    );
  }

    //INCOMPLETE
  // Find all employees by manager, join with departments and jobs to display titles and department names
  findEmployeesByManager(managerId) {
    return this.query(
      'SELECT employee.employee_id, employee.first_name, employee.last_name, department.department_name AS department, job.title FROM employee LEFT JOIN job on job.job_id = employee.job_id LEFT JOIN department ON department.department_id = job.department_id WHERE manager_id = $1;',
      [managerId]
    );
  }
}

module.exports = new DB();
