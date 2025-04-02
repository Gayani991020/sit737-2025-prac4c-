const express = require("express");
const winston = require("winston");
const app = express();

// Logger setup
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

// Arithmetic operations
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
    if (n2 === 0) throw new Error("Cannot divide by zero");
    return n1 / n2;
};
const exponentiate = (base, exp) => Math.pow(base, exp);
const squareRoot = (num) => {
    if (num < 0) throw new Error("Cannot calculate square root of negative numbers");
    return Math.sqrt(num);
};
const modulo = (n1, n2) => n1 % n2;

// API Endpoints
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

app.get("/subtract", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input numbers");
        const result = subtract(n1, n2);
        logger.info(`Subtraction requested: ${n1} - ${n2}`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input numbers");
        const result = multiply(n1, n2);
        logger.info(`Multiplication requested: ${n1} * ${n2}`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.get("/divide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input numbers");
        const result = divide(n1, n2);
        logger.info(`Division requested: ${n1} / ${n2}`);
        res.status(200).json({ result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

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

// Start the server
const port = 3040;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
