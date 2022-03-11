
let axios = require('axios').default;
let assert = require('assert');
const URL = 'http://127.0.0.1:3500/auth/login';


describe('Login Api', function () {
    let credential={
        "username": "admin",
        "password": "123456"
    }
    it('Should success Login if credential is valid', async function () {
        await axios.post(URL,credential)
            .then(axiosResponse => {
                let userObject = axiosResponse.data
               assert.ok(userObject)
            }).catch(res=>{
                assert.fail(res)
            })
    })

})
