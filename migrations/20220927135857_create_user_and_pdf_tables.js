/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 exports.up = function(knex) {
    return knex.schema.createTable("user", function(table) {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
    }).createTable("pdf", function(table){
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.string("file_name", 30).notNullable();
        table.string("file_link").notNullable();
        table
            .foreign("user_id")
            .references("id")
            .inTable("user")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // delete the two tables
    return knex.schema.dropTable("pdf").dropTable("user");
};
