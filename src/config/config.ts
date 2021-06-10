import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  name: 'Tangerine API',
  port: process.env.PORT,
  jwtSecret: 'sample-secret',
  elastic_search: {
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USER,
    password: process.env.ELASTICSEARCH_PASS,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
};

export default config
