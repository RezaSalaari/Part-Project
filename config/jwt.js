require('dotenv').config()
module.exports.jwtConfig={
    accessKey: process.env.ACCESS_TOKEN,
    refreshKey: process.env.REFRESH_TOKEN,
    expireRefreshTime: "5s",
    expireAcessTime: "1d",
}