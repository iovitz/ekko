export enum ServerError {
  UnhandleException = 500
}
export enum ServerResponseCode {
  Success = 0,
  ClientError = 40000,
  AthenticationError = 40001,
  ParamsError = 40002,
  NotExist = 40004,
  ServerError = 50000
}
export enum ServerResponseStatus {
  Success = 'Success',
  Failed = 'Failed'
}

export enum ErrorMessage {}
