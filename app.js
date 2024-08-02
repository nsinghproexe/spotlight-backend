// app.js
const express = require("express");
const db = require("./db");
const app = express();
const port = 3000;
const { randomInt } = require("crypto");
var cron = require("node-cron");
const fs = require("fs");

const allEmployees = {
  jayShreeEmployees: [
    "Dhaval Agravat",
    "Fenil Vediya",
    "Mausmee Butani",
    "Chintan Bambaroliya",
    "Rohit Nale",
    "Nitesh Singh",
    "Prashant Pipaliya",
    "Purvi Shiyani",
    "Hardika Dudhat",
    "Jaimish Ribadiya",
    "Dhara Bhaskar",
    "Vimlesh Kumhar",
    "Jogendra",
    "Jayan Ribadiya",
    "Hardik Gohil",
    "Riyal Savaj",
    "Piyush Dudhat",
    "Keshav Vaishnav",
    "Shreyashi Biswas",
    "Mayur Korat"
  ],
  nimaviEmployees: [],
  blackListedEmployees: [],
};

let spotlightEmployee = "";

var getEmployeeName = () => {
  console.log("allEmployees before: ", allEmployees);
  const number = randomInt(0, allEmployees.jayShreeEmployees.length);
  console.log("number: " + number);

  spotlightEmployee = allEmployees.jayShreeEmployees[number];
  console.log("currentEmployee", spotlightEmployee);

  allEmployees.blackListedEmployees.push(spotlightEmployee);

  allEmployees.jayShreeEmployees = allEmployees.jayShreeEmployees.filter(
    (item) => item !== spotlightEmployee
  );
  console.log("allEmployees after:   ", allEmployees);
};

cron.schedule("0 0 * * *", () => {
  console.log("running a task every midnight");

  if (allEmployees.jayShreeEmployees.length === 0) {
    console.log("all employees turn over refilling list again... ");
    allEmployees.jayShreeEmployees = allEmployees.blackListedEmployees;
    allEmployees.blackListedEmployees = [];
  }
  getEmployeeName();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/spotlight/employee", (req, res) => {
  console.log("received request from employee");
  res.json({ data: spotlightEmployee });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
