export class BaseError {
  message: string
  statusCode: number
  constructor(message: string, statusCode: number) {
    this.message = message
    this.statusCode = statusCode
  }
  
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 422)
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401)
  }
}

