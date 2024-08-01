const { prompt } = require("inquirer");
const db = require("./db");
const { log } = require("console");

init();

// Display logo text, load main prompts
function init() {
console.log('Welcome to the Employee Tracker :)');
console.log(`
███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝`);

console.log(`
████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░  
╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗  
░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝  
░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗  
░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║  
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝  `);
console.log(`
█▀▀ ▀█▀   █▀▀ █ █▀▄ █▀▀ █▀█ █▄░█   ▀█▀ █░█ █▀▀   █▄░█ █ █▄░█ ▀█▀ █░█
█▀░ ░█░   █▄█ █ █▄▀ ██▄ █▄█ █░▀█   ░█░ █▀█ ██▄   █░▀█ █ █░▀█ ░█░ █▀█ \n \n \n`);
mainPrompts();
}

function mainPrompts () {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do? \n \n",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee job",
          value: "UPDATE_EMPLOYEE_job",
        },
        {
          name: "View All jobs",
          value: "VIEW_JOBS",
        },
        {
          name: "Add job",
          value: "ADD_JOB",
        },
        {
          name: "Remove job",
          value: "REMOVE_JOB",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_job":
        updateEmployeejob();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_JOBS":
        viewjobs();
        break;
      case "ADD_JOB":
        addjob();
        break;
      case "REMOVE_JOB":
        removejob();
        break;
      default:
        quit();
    }
  });
}

// View all employees
function viewEmployees() {
  db.findAllEmployees()
    .then(({ rows }) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainPrompts());
}

// View all employees that belong to a department
function viewEmployeesByDepartment() {
  db.findAllDepartments().then(({ rows }) => {
    let departments = rows;
    const departmentChoices = departments.map(({ department_id, department_name }) => ({
      name: department_name,
      value: department_id,
    }));

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByDepartment(res.departmentId))
      .then(({ rows }) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => mainPrompts());
  });
}

// Delete an employee
function removeEmployee() {
  db.findAllEmployees().then(({ rows }) => {
    let employees = rows;
    const employeeChoices = employees.map(({ employee_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: employee_id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Removed selected employee from the database"))
      .then(() => mainPrompts());
  });
}

// Update an employee's job
function updateEmployeejob() {
  db.findAllEmployees().then(({ rows }) => {
    let employees = rows;
    const employeeChoices = employees.map(({employee_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: employee_id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's job do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAlljobs().then(({ rows }) => {
        let jobs = rows;
        const jobChoices = jobs.map(({ job_id, title }) => ({
          name: title,
          value: job_id,
        }));

        prompt([
          {
            type: "list",
            name: "jobId",
            message:
              "Which job do you want to assign to the selected employee?",
            choices: jobChoices,
          },
        ])
          .then((res) => db.updateEmployeejob(employeeId, res.jobId))
          .then(() => console.log("Updated employee's job."))
          .then(() => mainPrompts());
      });
    });
  });
}

// View all jobs
function viewjobs() {
  db.findAlljobs()
    .then(({ rows }) => {
      let jobs = rows;
      console.log("\n");
      console.table(jobs);
    })
    .then(() => mainPrompts());
}

// Add a job
function addjob() {
  db.findAllDepartments().then(({ rows }) => {
    let departments = rows;
    const departmentChoices = departments.map(({ department_id, department_name }) => ({
      name: department_name,
      value: department_id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the name of the job?",
      },
      {
        name: "salary",
        message: "What is the salary of the job?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the job belong to?",
        choices: departmentChoices,
      },
    ]).then((job) => {
      db.createjob(job)
        .then(() => console.log(`Added ${job.title} to the database`))
        .then(() => mainPrompts());
    });
  });
}

// Delete a job
function removejob() {
  db.findAlljobs().then(({ rows }) => {
    let jobs = rows;
    const jobChoices = jobs.map(({ job_id, title }) => ({
      name: title,
      value: job_id,
    }));

    prompt([
      {
        type: "list",
        name: "jobId",
        message:
          "Which job do you want to remove? (Warning: This will also remove the job's current employees)",
        choices: jobChoices,
      },
    ])
      .then((res) => db.removejob(res.jobId))
      .then(() => console.log("Removed job from the database."))
      .then(() => mainPrompts());
  });
}

// View all departments
function viewDepartments() {
  db.findAllDepartments()
    .then(({ rows }) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainPrompts());
}

// Add a department
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((department) => {
    let department_name = department.name;
    db.createDepartment(department_name)
      .then(() => console.log(`Added ${department.name} to the database`))
      .then(() => mainPrompts());
  });
}

// Delete a department
function removeDepartment() {
  db.findAllDepartments().then(({ rows }) => {
    let departments = rows;
    const departmentChoices = departments.map(({ department_id, department_name }) => ({
      name: department_name,
      value: department_id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (Warning: This will also remove the department's associated jobs and employees)",
      choices: departmentChoices,
    })
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log(`Removed department from the database`))
      .then(() => mainPrompts());
  });
}

// Add an employee
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAlljobs().then(({ rows }) => {
      let jobs = rows;
      const jobChoices = jobs.map(({ job_id, title }) => ({
        name: title,
        value: job_id,
      }));

      prompt({
        type: "list",
        name: "jobId",
        message: "What is the employee's job?",
        choices: jobChoices,
      })
        .then((res) => {
          let jobId = res.jobId;

          let employee = {
            job_id: jobId,
            first_name: firstName,
            last_name: lastName,
          };

          db.createEmployee(employee);
        })
        .then(() =>
          console.log(`Added ${firstName} ${lastName} to the database`)
        )
        .then(() => mainPrompts());
    });
  });
}

// Exit the application
function quit() {
  console.log("Ciao!");
  process.exit();
}
