const fs = require("fs");
const EventEmitter = require("events");
const Server = require("strict-server");
const Router = require("stric-router").Router;
const AlfaOrm = require("alfaorm");
const {
  serverConfig,
  routerConfig,
  servicesDirectory,
} = require("./config/server");
const { dbConfig } = require("./config/db");
let tables = [];
const eventEmitter = new EventEmitter();
serverConfig.eventEmitter = eventEmitter;
routerConfig.eventEmitter = eventEmitter;
const server = new Server(serverConfig);
const router = new Router(routerConfig);
const alfaOrm = new AlfaOrm(dbConfig);
server.start();
loadApps();

function loadApps() {
  const serviceNames = fs.readdirSync(servicesDirectory);
  serviceNames.forEach((appName) => {
    const app = require(`${servicesDirectory}/${appName}`);
    Object.keys(app.routes).forEach((route) => {
      Object.keys(app.routes[route]).forEach((method) => {
        const routeObj = {
          route,
          method,
          function: app.routes[route][method].function,
          middlewares: app.routes[route][method].middlewares,
          roles: app.routes[route][method].roles,
        };
        router.addRoute(routeObj);
      });
    });
  });

  let tables = [];
  serviceNames.forEach((appName) => {
    const app = require(`${servicesDirectory}/${appName}`);
    if (app["schema"]) {
      tables.push(...Object.values(app["schema"]));
    }
  });
  if (tables && tables.length) {
    try {
      alfaOrm.createTable(tables);
    } catch (error) {
      console.log("Database Config is wrong !!-");
    }
  }
}
module.exports.alfaOrm = alfaOrm;
