const fs = require("fs");
const EventEmitter = require("events");
const Server = require('strict-server');
const Router = require("stric-router").Router;
const c = require("./config");
const AlfaOrm = require("alfaorm");
let tables = [];
const eventEmitter = new EventEmitter();
c.serverConfig.eventEmitter = eventEmitter;
c.routerConfig.eventEmitter = eventEmitter;
const server = new Server(c.serverConfig);
const router = new Router(c.routerConfig);
const alfaOrm = new AlfaOrm(c.dbConfig);
server.start();
loadApps();

function loadApps() {
  const serviceNames = fs.readdirSync(c.servicesDirectory);
  serviceNames.forEach((appName) => {
    const app = require(`${c.servicesDirectory}/${appName}`);
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
    const app = require(`${c.servicesDirectory}/${appName}`);
    if (app["schema"]) {
      tables.push(...Object.values(app["schema"]));
    }
  });
  if (tables) {
    try {
       alfaOrm.createTable(tables);
    } catch (error) {
      console.log('Database Config is wrong !!-')
    }
  }
}
module.exports.alfaOrm = alfaOrm;
