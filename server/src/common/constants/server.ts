export enum ServerError {
  UnhandleException = 500
}
export enum ServerResponseCode {
  Success = 200,
  ClientError = 400,
  NotExist = 404,
  ServerError = 500,
  AthenticationError = 503
}
export enum ServerResponseStatus {
  Success = 'Success',
  Failed = 'Failed'
}
