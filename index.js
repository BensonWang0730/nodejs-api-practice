// import express from "express";
// import { getAllEmployee, getEmployee, findNewEmployee } from "./database.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerFile from "./swagger_output.json" assert { type: "json" };

const express = require("express");
const database = require("./database.js");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const { getAllEmployee, getEmployee, findNewEmployee } = database;

const app = express();
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const checkCodeMiddleware = (req, res, next) => {
  if (req) {
    next();
  } else {
    res.status(401).send("error");
  }
};

app.get("/", checkCodeMiddleware, (_req, res) => {
  res.send("home page connect");
});

app.get("/allemployee", checkCodeMiddleware, async (_req, res) => {
  const result = await getAllEmployee();
  res.status(200);
  res.send(result);
});

app.get("/allemployee/:id", checkCodeMiddleware, async (req, res) => {
  const id = req.params.id;
  const result = await getEmployee(id);
  res.send(result);
  res.status(200);
});

app.post("/allemployee", async (req, res) => {
  const {} = req.body; // 解構傳入的變數
  const result = await findNewEmployee();
  res.status(200).send();
});

// middleware
app.use((req, res) => {
  res.status(404).send("page not found");
});
app.use((err, req, res) => {
  res.status(500);
});

app.listen(8080, () => {
  console.log(`Server is running at http://localhost:8080 `);
});
