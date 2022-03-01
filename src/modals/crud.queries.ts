import dbConnection, { qb } from "../config/db_config";
import dbError from "../constants/db.error";

const log = console.log;

type Input = string | number;

export default class CrudQuery {
  protected name: string;
  protected table: string;
  constructor(name: string, table: string) {
    this.name = name;
    this.table = table;
  }
  async getByColumn(columnName: string, value: Input): Promise<any> {
    let connection: any;
    try {
      const sqlQuery = qb
        .select("*")
        .where(columnName, value)
        .from(this.table)
        .toString();
      connection = await dbConnection.getConnection();
      const response = await connection.execute(sqlQuery);
      if (response && response[0].length > 0) {
        return successResponse(response[0]);
      } else {
        throw new Error("no results found");
      }
    } catch (err) {
      console.log(err);
      return {
        txn: false,
        message: "item not found",
      };
    } finally {
      connection.release();
    }
  }
  async create(payload: any) {
    let connection;
    try {
      const sqlQuery = qb(this.table).insert(payload).toString();
      connection = await dbConnection.getConnection();
      const response = await connection.execute(sqlQuery);
      if (response) {
        return successResponse(response[0]);
      } else {
        failResponse(`failed to create ${this.name}`);
      }
    } catch (err) {
      console.log(err);
      return {
        txn: false,
        message: "unhandled error code",
      };
    } finally {
      connection.release();
    }
  }

  async getAll(payload: any) {
    let connection;
    try {
      const sqlQuery = qb.select("*").from(this.table).toString();
      connection = await dbConnection.getConnection();
      const response: any[] = await dbConnection.execute(sqlQuery);
      if (response && response[0].length > 0) {
        return successResponse(response[0]);
      } else {
        failResponse(`No ${this.name} Found`);
      }
    } catch (err) {
      return {
        txn: false,
        message: "unhandled error",
      };
    } finally {
      connection.release();
    }
  }


  async update(columnName:string, columnValue:any, payload:any) {
    let connection;
    try {
      const sqlQuery = qb(this.table)
        .where(columnName, columnValue)
        .update(payload)
        .toString();

      connection = await dbConnection.getConnection();
      const response:any= await connection.execute(sqlQuery);
      connection.release();
      if (response) {
        return successResponse(response[0].affectedRows);
      } else {
        failResponse(`Failed to Update`);
      }
    } catch (err) {
      console.log(err);
      connection.release();
      return {
        txn: false,
        message: "unhandled error",
      };
    }
  }

  async deleteByColumn(columnname:string, columnValue:any) {
    let connection;
    try {
      const sqlQuery = qb
        .from(this.table)
        .where(columnname, columnValue)
        .del()
        .toString();
      connection = await dbConnection.getConnection();
      const response:any = await connection.execute(sqlQuery);
      connection.release();
      if (response && response[0].affectedRows > 0) {
        return successResponse(response[0].affectedRows);
      } else {
        failResponse(`Failed to Delete ${this.name}`);
      }
    } catch (err) {
      connection.release();
      console.log(err);
      return {
        txn: false,
        message: "unhandled error",
      };
    }
  }
}

const successResponse = (data: any) => ({ txn: true, data });
const failResponse = (message: string) => {
  throw message;
};
