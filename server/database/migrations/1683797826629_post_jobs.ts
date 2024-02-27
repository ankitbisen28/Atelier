import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "post_jobs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("phone_num", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("address", 255).notNullable();
      table.string("state", 255).notNullable();
      table.integer("zip", 255).notNullable();
      table.string("type_clothing", 255).notNullable();
      table.string("description", 255).notNullable();
      table.integer("budget", 255).notNullable();
      table.json("images");
      table.integer("user_id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
