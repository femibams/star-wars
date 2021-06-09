import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  name: 'Tangerine API',
  port: process.env.PORT,
  jwtSecret: 'sample-secret',
  es_node: process.env.ELASTICSEARCH_NODE
};

export default config
