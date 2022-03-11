let axios = require("axios").default;
let assert = require("assert");
const URL = "http://127.0.0.1:3500/products";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDUyLCJyb2xlIjoiMyJ9LCJpYXQiOjE2NDY5ODcyMzksImV4cCI6MTY0NzA3MzYzOX0.RBb_I_zYR0s3uoMHhn6W3pp9EkoF4hePP_YZO0aazpk";

describe("Product Api", function () {
  let credential = {
    "assigned_to": "1",
  };
  it("Should be created Product for user ID = assigned_to", async function () {
    await axios
      .post(URL, credential, { headers: { Authorization: `Bearer ${TOKEN}` } })
      .then((axiosResponse) => {
        let productObject = axiosResponse.data;
        console.log(productObject);
        assert.ok(productObject);
      })
      .catch((res) => {
        assert.fail(res);
      });
  });

  it("Should Be Listed All Products if Role == Adimn", async function () {
    await axios
      .get(URL, { headers: { Authorization: `Bearer ${TOKEN}` } })
      .then((response) => {
          assert.ok(response.data)
      }).catch((err)=>{
          assert.fail(err)
      })
  });


  it('Should return products related to the role of supporter or employee',async function(){
      await axios
      .get(`${URL}/users`, { headers: { Authorization: `Bearer ${TOKEN}` }})
      .then((response)=>{
          assert.ok(response)
      })
      .catch((err)=>{
          assert.fail(err)
      })
  })
});
