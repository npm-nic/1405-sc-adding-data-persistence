const db = require("../../data/db-config");

module.exports = {
  findProjects,
  findProjectById,
  findResources,
  findProjectTasks,
  addProject,
  addResource,
  addTask,
};

// // // // GET ⤵️ // // // //

// // --> RETURN known PROJECTS <-- // //
function findProjects() {
  return db("projects");
}
// // --> RETURN PROJECT using ID <-- // //
function findProjectById(id) {
  return db("projects").where({ id }).first();
}
// // --> RETURN known RESOURCES <-- // //
function findResources() {
  return db("resources");
}
// // --> RETURN all TASKS for a PROJECT using ID <-- // //
function findProjectTasks(project_id) {
  return db("tasks")
    .join("projects", "tasks.project_id", "projects.id")
    .where({ project_id })
    .select(
      "tasks.id",
      "projects.name",
      "projects.description",
      "tasks.description",
      "tasks.notes",
      "tasks.completed"
    );
}

// // // // ADD ⤵️ // // // //

// // --> RETURN added project id <-- // //
function addProject(project) {
  return db("projects").insert(project);
}
// // --> RETURN added resource id <-- // //
function addResource(resource) {
  return db("resources").insert(resource);
}
// // --> RETURN added task id <-- // //
function addTask(task) {
  console.log("addTask -> task", task);
  return db("tasks").insert(task);
}

// [NOTES]
// Build an API with endpoints for:
// --> adding resources.
// --> retrieving a list of resources.
// --> adding projects.
// --> retrieving a list of projects.
// --> adding tasks.
// --> retrieving a list of tasks. **The list of tasks should include the project name and project description**.
