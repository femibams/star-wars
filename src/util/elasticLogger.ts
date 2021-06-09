import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'
import config from '../config';
import { Log } from '../types/index';

const client = new Client({ node: 'http://elasticsearch:9200' })

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
        console.log("error from es")
        console.log(err)
    })
}