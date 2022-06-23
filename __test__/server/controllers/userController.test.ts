import * as jest from 'jest';
import request from 'supertest';
// import * as req from "express/lib/request";
// import { Request, Response, NextFunction } from 'express';
import {Pool} from 'pg';
//New URI for Sql testing
// const PG_URI  =  'postgres://vwfofczb:Jy7dhkeZsVCm5HhzcWJaF1DkCGRBALB4@queenie.db.elephantsql.com/vwfofczb';


// Import the server file since we will be making requests directly to the server.
// The script below didnt work since it was sending the request as it is from postman.
// const server = 'http://localhost:8080'

// import app from '../../../../server/server.js'
import app from '../../../server/server.js'

import { pool } from '../../../server/controllers/userController.js'

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
        console.log('Created Test Instance Table')
    });
    describe ('/user/signup' ,() => {
        it('Should create a new user & password & email in usertable', async() => {
            const response = await request(app)
              .post('/user/signup')
              .send({
                username: 'Ryan',
                password: '1234',
                email: 'RyanEmail'
              })
              .set('Accept','application/json')
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(1);
        })
    })
    describe ('/user/login', () =>{
        it ('Should login successfully with correct username and password', async() =>{
            const response = await request(app)
              .post('/user/login')
              .send({
                username: 'Ryan',
                password: '1234',
              })
              .set('Accept', 'application/json')
              expect(response.headers['content-type']).toMatch(/json/);
              expect(response.status).toEqual(200);
              expect(response.body).toEqual(true);
        })
    })
});

