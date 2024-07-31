DROP DATABASE IF EXISTS employeetracker;

-- Create a new database
CREATE DATABASE employeetracker;

-- Connect to the newly created database
\c employeetracker;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

-- Create a roles table
CREATE TABLE roles (
    book_id INTEGER PRIMARY KEY,
    book_name VARCHAR(255)
);

-- Create an departments table
CREATE TABLE departments (
    author_id INTEGER PRIMARY KEY,
    author_name VARCHAR(255)
);

-- Create an employees table
CREATE TABLE employees (
    author_id INTEGER PRIMARY KEY,
    author_name VARCHAR(255)
);

-- TODO: Add a transaction block here

DO $$

DECLARE
BEGIN

    INSERT INTO books (book_id, book_name)
    VALUES
        (1, 'Pride and Prejudice'),
        (2, 'To Kill a Mockingbird'),
        (3, 'The Great Gatsby');

    INSERT INTO authors (author_id, author_name)
    VALUES
        (10, 'Jane Austen'),
        (11, 'Harper Lee');

RAISE NOTICE 'Transaction complete';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        ROLLBACK;
END $$;