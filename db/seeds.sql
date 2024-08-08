--insert all department names--
INSERT INTO department (department_name)
VALUES ('First House'), 
('Second House'),
('Third House'),
('Fourth House'),
('Fifth House'),
('Sixth House'),
('Seventh House'),
('Eighth House'),
('Ninth House');

--inset all job titles, salaries, and department ids--
INSERT INTO job (title, salary, department_id)
VALUES 
('Emperor', 1000000000, 1), 
('Lyctor', 500000, 1), 
('Templar of the White Glass', 40000, 8),
('Ranked First Lieutenant of the Cohort', 40000, 2),
('Prince of Ida', 40000, 3),
('Knight of Tisis', 40000, 4),
('Seneschal of the Koniortos Court', 40000, 5),
('Wardens Hand of the Library', 40000, 6),
('Knight of Rhodes', 40000, 7),
('Indentured Servant of the House of the Ninth', 40000, 9),
('Ranked Captain of the Cohort', 100000, 2),
('Crown Princess of Ida', 100000, 3),
('Baron of Tisis', 100000, 4),
('Lady of the Koniortos Court', 100000, 5),
('Master Warden of the Library', 100000, 6),
('Duchess of Rhodes', 100000, 7),
('Master Templar of the White Glass', 100000, 8),
('Reverend Daughter of Drearburh', 100000, 9);

--insert all employee info--
INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ('John', 'Gaius', 1, NULL),
('Judith', 'Deuteros', 11, NULL),
('Marta', 'Dyas', 4, 3),
('Coronabeth', 'Tridentarius', 12, NULL),
('Ianthe', 'Tridentarius', 12, 1),
('Naberius', 'Tern',5, 5),
('Isaac', 'Tettares', 13, NULL),
('Jeannemary', 'Chatur', 6, 7),
('Abigail', 'Pent', 14, NULL),
('Magnus', 'Quinn', 7, 9),
('Palamedes', 'Sextus', 15, NULL),
('Camilla', 'Hect', 8, 11),
('Dulcinea', 'Septimus', 16, NULL),
('Protesilaus', 'Ebdoma', 9, 13),
('Silas', 'Octakiseron', 17, NULL),
('Colm', 'Asht', 3, 15),
('Harrowhark', 'Nonagesimus', 18, NULL),
('Gideon', 'Nav', 10, 17),
('Augustine', 'the First', 2, 1),
('Mercymorn', 'the First', 2, 1),
('Gideon', 'the First', 2, 1),
('Cassiopeia', 'the First', 2, 1),
('Cyrus', 'the First', 2, 1),
('Ulysses', 'the First', 2, 1), 
('Cytherea', 'the First', 2, 1);
