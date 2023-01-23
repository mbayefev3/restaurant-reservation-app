

// Table name: <input name="table_name" />, which must be at least 2 characters long.
// Capacity: <input name="capacity" />, this is the number of people that can be seated at the table,
exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary();
        table.string("table_name")
        table.integer("capacity")
        table.integer("reservation_id").unsigned();
        table
            .foreign("reservation_id")
            .references("reservation_id")
            .inTable("reservations")
            .onDelete("CASCADE");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {

    return knex.schema.dropTable("tables");

};
