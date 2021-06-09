import { Response as ExpressResponse } from 'express';

interface Response {
  code?: number;
  message?: any;
  data?: unknown;
  error?: boolean;
}

function respond<T>(res: ExpressResponse, data: Response, code: number) {

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Method', '*');


  res.writeHead(code);
  res.end(JSON.stringify(data))
}

function success<T>(res: ExpressResponse, response: Response, httpCode: number = 200) {
  const resp: Response = response
  resp.error = false
  resp.code = httpCode

  respond<T>(res, resp, httpCode)
}

function failure(res: ExpressResponse, data: Response, httpCode: number = 503) {
  const resCode = data.code || httpCode
  const resp: Response = data
  data.error = true
  resp.code = resCode

  respond(res, resp, resCode)
}

export const ApiResponse = {
  success,
  failure
}
