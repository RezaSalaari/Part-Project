require('dotenv').config()

const jwtConstants = {
  accessKey:process.env.ACCESS_TOKEN,
  refreshKey:process.env.REFRESH_TOKEN,
  expireRefreshTime:'1w',
  expireAcessTime: '1d',
};
const errors = {};

module.exports = {
  errors,
  jwtConstants,
};
