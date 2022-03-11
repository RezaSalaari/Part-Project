const serverConfig = {
  hostname: "127.0.0.1",
  port: 3500,
  eventEmitter: null,
};

const routerConfig = {
  eventEmitter: null,
};

const servicesDirectory = "./services";

module.exports = {
  serverConfig,
  routerConfig,
  servicesDirectory,
};
