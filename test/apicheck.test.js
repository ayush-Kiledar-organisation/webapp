const request = require('supertest');


const generateMail = require('./mailgen');


// Integration testing

let email = generateMail();
console.log(email)

// test for create and get user

try{
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
  
       const token = Buffer.from(`${user_obj.email}:${user_obj.password}`).toString('base64');
  
        const resGetUser = await request(app).get("/v1/user/self").set("Authorization", `Basic ${token}`);
  
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
          
          await expect(resUpdateUser.statusCode).toBe(200);
  
          const newToken = Buffer.from(`${email}:${user_obj.password}`).toString('base64');
  
          const resGetUser = await request(app).get("/v1/user/self").set("Authorization", `Basic ${newToken}`);
  
          expect(resGetUser.statusCode).toBe(200);
      });
  });  
}

catch(err){
  console.log(err);
}
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

     const token = Buffer.from(`${user_obj.email}:${user_obj.password}`).toString('base64');

      const resGetUser = await request(app).get("/v1/user/self").set("Authorization", `Basic ${token}`);

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

}
catch(err){
  console.log(err)
}

// test complete and succesful
