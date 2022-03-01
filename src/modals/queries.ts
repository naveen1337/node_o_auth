import { qb } from "../config/db_config";

const userTableSchema = () => {
  try {
    const tableSQLQuery = qb.schema
      .createTable("users", (table) => {
        table.increments("user_id");
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.dateTime("created_at").defaultTo(qb.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(qb.fn.now()).notNullable();
      })
      .toString();
    return tableSQLQuery;
  } catch (err) {
    return false;
  }
};

const authTableSchema = () => {
  try {
    const tableSQLQuery = qb.schema
      .createTable("auth", (table) => {
        table.increments("sid");
        table.integer("user_id").notNullable();
        table.string("r_token").notNullable();
        table.dateTime("created_at").defaultTo(qb.fn.now()).notNullable();
      })
      .toString();
    return tableSQLQuery;
  } catch (err) {
    return false;
  }
};

export default {
  authTableSchema,
  userTableSchema
};
