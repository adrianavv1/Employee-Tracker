# Employee-Tracker

## Description

This is a command-line appication known as Content Management System. This app utilizes Node, InquirerJs, console.table, and MySQL. It allows the user to view interact with information stored database that manages the departments, roles, and employees in ones company.

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Process

This command-line application will allow the user to:

- View Departments, roles, & employees

- Add departments, roles, & employees

- Update employee roles, & managers

- update employee managers (this is a work-in-progress at the moment.)

- Delete departments, roles, & employees

## Installation

To get started you must first clone the repository and run `npm install` in order to install the following npm package dependencies.

- MYSQL npm package- this is to allow MYSQL database and perform queries.

- InquireJS npm package- This provides the user to launch the prompt interface.

You also should have the following files `db/schema.sql` and `db/seedsql` files to the database locally.

## Application Screenshot

Screenshot below:

## Database Schema

![tables](img\12-MySQL_02-Homework_Assets_schema.png)

the database `schema.sql` file should create the following tables:

department:

- id - INT PRIMARY KEY

- name - VARCHAR(30) to hold department name

role:

id - INT PRIMARY KEY

title - VARCHAR(30) to hold role title

salary - DECIMAL to hold role salary

department_id - INT to hold reference to department role belongs to

employee:

id - INT PRIMARY KEY

first_name - VARCHAR(30) to hold employee first name

last_name - VARCHAR(30) to hold employee last name

role_id - INT to hold reference to role employee has

manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

The `seeds.sql` file will generate your database employees.

## Future Development

* Feel free to tweek through this code. I have not been able to get the updateManager function to work properly. 

* Utilize an NPM package for consolo.table

* Enhance logic and functionality to further update the employee data


## Contact 

If you have any questions in regards to this repository feel free to email me at adrianavaldiglesias2@gmail.com. 

Github: [Github](https://github.com/adrianavv1)
