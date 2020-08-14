// // --> IMPORTS <-- // //
//  packages
const express = require("express");
const helmet = require("helmet");
//  routers
const projectsRouter = require("./projects/projects-router");

// // --> SET UP SERVER <-- // //
const app = express();

// // --> GLOBAL MIDDLEWARE <-- // //
app.use(express.json());
app.use(helmet());

// // --> ROUTES <-- // //
app.use("/api/projects", projectsRouter);

app.get("/hello", (req, res) => {
  res.status(200).json({ hello: "world" });
});

// // --> EXPORT <-- // //
module.exports = app;
