const projectsRouter = require("express").Router();

const db = require("./projects-model");


// // --> GET all known projects <-- // // 
projectsRouter.get("/", (req, res) => {
  db.findProjects()
    .then((projects) => {
      projects && res.status(200).json({ projects });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ message: "its not you, its me 💔" });
    });
});

// // --> GET all known resources <-- // // 
projectsRouter.get("/resources", (req, res) => {
  db.findResources()
    .then((resources) => {
      resources && res.status(200).json({ resources });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ error: "its not you, its me 💔" });
    });
});

// // --> GET all tasks for project :id <-- // // 
projectsRouter.get("/:id/tasks", verifyProjectExists, (req, res) => {
  const req_id = req.params.id;
  db.findProjectTasks(req_id)
    .then((tasks) => {
      tasks
        ? res.status(200).json({ tasks })
        : res
            .status(404)
            .json({ message: `no tasks found for project id: ${req_id}` });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ error: "its not you, its me 💔" });
    });
});

// // --> POST new project <-- // //
projectsRouter.post("/", (req, res) => {
  const projectData = req.body;

  db.addProject(projectData)
    .then((created_project_id) => {
      res.status(201).json({ created_project_id });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({
            error: "failed to create project...plz try again :)",
          });
    });
});

// // --> POST new resource <-- // //
projectsRouter.post("/resources", (req, res) => {
  const resourceData = req.body;

  db.addResource(resourceData)
    .then((created_resource_id) => {
      res.status(201).json({ created_resource_id });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({
            error: "failed to create resource...plz try again :)",
          });
    });
});

// // --> POST task to project :id <-- // //
projectsRouter.post("/:id/tasks", verifyProjectExists, (req, res) => {
  const taskData = { ...req.body, project_id: req.params.id };

  db.addTask(taskData)
    .then((created_task_id) => {
      res.status(201).json({ created_task_id });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({
            error: "failed to create task...plz try again :)",
          });
    });
});

// // --> DOES PROJECT EXIST ? middleware <-- // //
async function verifyProjectExists(req, res, next) {
  const req_id = req.params.id;
  try {
    const projectFound = await db.findProjectById(req_id);
    projectFound
      ? next()
      : res.status(200).json({ message: `no project with the id: ${req_id}` });
  } catch (err) {
    err.message
      ? res.status(500).json({ error: err.message })
      : res.status(500).json({
          error: "something went wrong while verifying project exists",
        });
  }
}

module.exports = projectsRouter;
