import { ServerResponseCode, ServerResponseStatus } from '@/common/constants'

export abstract class ErrorBase extends Error {
  constructor(public code: ServerResponseCode, message: any) {
    super(message)
  }

  toJSON() {
    return {
      code: this.code,
      status: ServerResponseStatus.Failed,
      data: this.message
    }
  }
}

export class ClientError extends ErrorBase {
  constructor(message: any) {
    super(ServerResponseCode.ClientError, message)
  }
}

export class UnhandleExceptionError extends ErrorBase {
  constructor(message: any) {
    super(ServerResponseCode.ServerError, message)
  }
}

export class AuthenticationError extends ErrorBase {
  constructor(message: any) {
    super(ServerResponseCode.AthenticationError, message)
  }
}
