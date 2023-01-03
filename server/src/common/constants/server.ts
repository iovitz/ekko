export const testPhoneSet = [
  '10000000000',
  '10000000001',
  '10000000002',
  '10000000003',
  '10000000004',
  '10000000005',
  '10000000006',
  '10000000007',
  '10000000008',
  '10000000009'
]

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
