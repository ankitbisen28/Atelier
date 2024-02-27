import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "profiles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("first_name", 255).notNullable();
      table.string("last_name", 180).notNullable();
      table.string("phone", 220).nullable();
      table.string("address", 180).notNullable();
      table.string("state", 180).defaultTo(null);
      table.integer("post_code", 180).notNullable();
      table.string("image", 255).notNullable();
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
