exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("description");
      tbl.boolean("completed").default(false);
    })
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.string("description").notNullable();
      tbl.string("notes");
      tbl.boolean("completed").default(false);
      tbl
        .integer("project_id")
        .notNullable()
        .unsigned()
        .references("projects.id");
    })
    .createTable("resources", (tbl) => {
      tbl.increments();
      tbl.string("name").unique().notNullable();
      tbl.string("description");
    })
    .createTable("project_resources", (tbl) => {
      tbl.increments();
      tbl.integer("project_id").unsigned().references("projects.id");
      tbl.integer("resource_ud").unsigned().references("resources.id");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("project_resources");
};
