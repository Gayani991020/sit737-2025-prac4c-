Calculator Microservice Documentation

 Overview
This document provides step-by-step guidance on setting up and implementing your calculator microservice, handling errors, adding logging, and pushing the project to GitHub.

 Part I - Setting Up the Microservice

 1. Install Dependencies
Ensure you have Node.js installed. Then, create a new project and install the required dependencies:

mkdir calculator-microservice
cd calculator-microservice
npm init -y
npm install express winston


 2. Create the Microservice
Create an `index.js` file and set up the Express server:
javascript
const express = require("express");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "calculator-microservice" },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ],
});

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
    if (n2 === 0) throw new Error("Cannot divide by zero");
    return n1 / n2;
};

app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input numbers");
        const result = add(n1, n2);
        logger.info(`Addition requested: ${n1} + ${n2}`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

const port = 3040;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


 3. Run the Microservice

node index.js


 4. Logging
Logs will be saved in the `logs/` directory.

 Part II - Enhanced Functionality (Task 4.2C)

 1. Adding More Operations
Extend the microservice to include exponentiation, square root, and modulo:
javascript
const exponentiate = (base, exp) => Math.pow(base, exp);
const squareRoot = (num) => {
    if (num < 0) throw new Error("Cannot calculate square root of negative numbers");
    return Math.sqrt(num);
};
const modulo = (n1, n2) => n1 % n2;

app.get("/exp", (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exp = parseFloat(req.query.exp);
        if (isNaN(base) || isNaN(exp)) throw new Error("Invalid input numbers");
        const result = exponentiate(base, exp);
        logger.info(`Exponentiation requested: ${base} ^ ${exp}`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.get("/sqrt", (req, res) => {
    try {
        const num = parseFloat(req.query.num);
        if (isNaN(num)) throw new Error("Invalid input number");
        const result = squareRoot(num);
        logger.info(`Square root requested: sqrt(${num})`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.get("/mod", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input numbers");
        const result = modulo(n1, n2);
        logger.info(`Modulo requested: ${n1} % ${n2}`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});


 2. Research on Error Handling Strategies
- Circuit Breaker Pattern: Prevents system overload by blocking calls to failing services.
- Retry Pattern: Retries requests upon temporary failures.
- Fallback Mechanism: Provides default responses if the main service fails.

 Part III - Pushing to GitHub

 1. Initialize Git Repository

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/sit737-2025-prac4c.git
git push -u origin main


 2. Resolving Git Errors
If facing rejection errors due to a mismatch, use:

git pull origin main --rebase
git push origin main



