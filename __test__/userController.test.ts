import * as jest from 'jest';
import request from 'supertest';
// import * as req from "express/lib/request";
// import { Request, Response, NextFunction } from 'express';
import {Pool} from 'pg';
//New URI for Sql testing
const PG_URI  =  'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';
const server = 'http://localhost:3000'

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI,
});

describe ('database table creation test', ()=> {
    beforeAll( async ()=>{
        const dropAllTables = 'DROP TABLE IF EXISTS "user";';
        await pool.query(dropAllTables);
        const createUserTable = `CREATE TABLE IF NOT EXISTS "user"(
            _id SERIAL PRIMARY KEY,
            username VARCHAR(20) UNIQUE NOT NULL,
            pw VARCHAR NOT NULL,
            email VARCHAR UNIQUE NOT NULL
            );`;
        await pool.query(createUserTable);
    });
    describe ('/user/signup' ,() => {
        it('Should create a new user & password & email in usertable', async() => {
            const response = await request(server)
              .post('/user/signup')
              .send({
                username: 'Paul2',
                password: '1234',
                email: 'Paul2Email'
              })
              .set('Accept','application/json')
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(1);
        })
    })

});