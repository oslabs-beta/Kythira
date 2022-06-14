import {Pool} from 'pg';
const PG_URI : string =  'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';

// create a new pool here using the connection string above
const pool: Function = new Pool({
    connectionString: PG_URI,
  });
  
  const currentTable = `CREATE TABLE IF NOT EXISTS "user"(
      _id SERIAL PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      pw VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL
  );`;
  pool.query(currentTable);
  console.log("Current Table is created!");
  
  module.exports = {
    query: (text, params, callback) => {
      console.log('Executed the following query: *****', text);
      return pool.query(text, params, callback);
    },
  };
  