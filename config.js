const serverConfig = {
  hostname: '127.0.0.1',
  port: 3500,
  eventEmitter: null
};

const routerConfig = {
  eventEmitter: null
};

const dbConfig = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'test',
  password: process.env.PGPASSWORD || '137621',
  port: process.env.PGPORT || 5432,
  max: 20,
  idleTimeoutMillis: 2
};

const statusCodes = {
  SUCCESS: 200,
  CONFLICT: 409,
  NOTFOUND:404,
  UNAUTHORIZED:401,
  Forbidden:403,
  INTERNAL:500
};

const contentTypes = {
  JSON: "application/json",
};

const servicesDirectory = './services';

module.exports = {
  serverConfig,
  routerConfig,
  servicesDirectory,
  dbConfig,
  contentTypes,
  statusCodes
};
