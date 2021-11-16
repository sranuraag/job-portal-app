# Job Portal App

A simple replica of a real life job portal which allows Employers to post jobs and candidates to apply for those jobs. 

## Features

- Two modes of login - Employer or Employee. 
- Create jobs after logging in as an Employer. 
- Apply for jobs after logging in as an Employee. 


## Tech

Technologies required to run this app are : 

- React JS
- Node JS
- PostgreSQL

## Installation

This repository contains 2 folders - portal (React JS UI) and server (Express JS Server). Follow these steps to run the app : 

React JS UI
```sh
Clone this repository
cd portal 
npm install
npm start
```
Express JS Server
```sh
Clone this repository
Setup a PostgreSQL instance and provide DB details in server/.env 
Execute db_scripts.sql in DB
cd server
npm install
npm run devStart
```

API testing 

```sh
cd server
npm test
```