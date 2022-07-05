import request from 'supertest';
import app from '../../../server/server';

import { pool } from '../../../server/controllers/userController';

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
      const response = await request(app)
        .post('/user/signup')
        .send({
          username: 'Ryan',
          password: '1234',
          email: 'RyanEmail'
        })
        .set('Accept','application/json');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(1);
    });
  });
  describe ('/user/login', () =>{
    it ('Should login successfully with correct username and password', async() =>{
      const response = await request(app)
        .post('/user/login')
        .send({
          username: 'Ryan',
          password: '1234',
        })
        .set('Accept', 'application/json');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(true);
    });
  });
});

