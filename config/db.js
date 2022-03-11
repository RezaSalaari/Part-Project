const dbConfig = {
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'test',
    password: process.env.PGPASSWORD || '137621',
    port: process.env.PGPORT || 5432,
    max: 20,
    idleTimeoutMillis: 2
  };

  module.exports ={dbConfig}