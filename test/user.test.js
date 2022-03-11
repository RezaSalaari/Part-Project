let axios = require("axios").default;
let assert = require("assert");
const faker = require("@faker-js/faker").default;
const URL = "http://127.0.0.1:3500/user";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlIjoiMCJ9LCJpYXQiOjE2NDY5NDU5MTQsImV4cCI6MTY0NzAzMjMxNH0.aOeyHCIlE49dqs60Lkg2erDs-jzRD2yATtI3ls4Al94";

describe("User Api", function () {
  let user = {
    "username": faker.internet.userName(),
    "password": String(faker.datatype.number()),
    "gender": faker.random.arrayElement(['1','0']),
    "role": faker.random.arrayElement(["0", "1", "2", "3"]),
  };
console.log(user);
  it("Should Be Created User if Role == Admin || SuperAdmin", async function () {
    await axios
      .post(URL, user, { headers: { Authorization: `Bearer ${TOKEN}` } })
      .then((resp)=>{
        assert.ok(resp.data)
      })
      .catch((err)=>{
        assert.fail(err)
      })
  });
});
