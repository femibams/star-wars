import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'
import config from '../config';
import { Log } from '../types/index';

const client = new Client({ 
    node: config.elastic_search.node,
    auth: {
        username: config.elastic_search.username,
        password: config.elastic_search.password
    }
})

export const elasticLogger = async(logObject: Log) => {
    const doc: RequestParams.Index = {
        index: 'logs',
        body: logObject
    }
    
    return await client.index(doc)
    .then(() => {
        console.log("saved to es")
    })
    .catch((err) => {
        console.log("error while saving to es")
        console.log(err)
    })
}