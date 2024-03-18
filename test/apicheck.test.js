const request = require('supertest');
const app = require('../server');
const generateMail = require('./mailgen');
const { credentials } = require('../cred/cred');


// Integration testing

let email = generateMail();
console.log(email);

beforeAll(async()=>{
  try {
      await credentials.sync({});
      console.log('Db connected');
    } catch (error) {
      console.log('Error:', error);
    }
});

// test for create and get user

  describe("TEST 1: Create user and get the user",()=>{
    test("creating an account", async()=>{
      const user_obj =
        {
          "email": email,
        "firstName": "Fname",
        "lastName": "Lname",
        "password": "Testing@234",
       };
       const resCreateUser = await request(app).post("/v1/user/self").send(user_obj);
  
       await expect(resCreateUser.statusCode).toBe(201);
       console.log("Create status=> ",resCreateUser.statusCode)
  
       const token = Buffer.from(`${user_obj.email}:${user_obj.password}`).toString('base64');
  
        const resGetUser = await request(app).get("/v1/user/self").set("Authorization", `Basic ${token}`);
        console.log("Get status1 => ",resGetUser.statusCode)
  
        expect (resGetUser.statusCode).toBe(200);
    });
  });
  
  // test for update and get user
  describe("TEST 2: Update User and get the user",()=>{
      test("Updating an existing user", async()=>{
          const user_obj=
              {
                  "firstName": "New fname",
                  "lastName": "New lname",
                  "password": "NewTesting@234",
              };
  
          const password ='Testing@234';
  
          const token = Buffer.from(`${email}:${password}`).toString('base64');
          const resUpdateUser = await request(app).put("/v1/user/self").set("Authorization", `Basic ${token}`).send(user_obj);
          
          await expect(resUpdateUser.statusCode).toBe(204);
  
          const newToken = Buffer.from(`${email}:${user_obj.password}`).toString('base64');
  
          const resGetUser = await request(app).get("/v1/user/self").set("Authorization", `Basic ${newToken}`);
  
          expect(resGetUser.statusCode).toBe(200);
      });
  });  

afterAll(async() => {
  try {
    await credentials.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing:', error);
  }
});


