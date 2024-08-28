import { HttpException, HttpStatus } from '@nestjs/common';

interface ExceptionParams {
  errorCode: string;
  errorDescription: string;
  statusCode: 400 | 404 | 409;
}

interface StatusCodeDictionary {
  [key: number]: HttpStatus;
}

/**
 * Dicionário que mapeia todos os status HTTP.
 *
 * @type {StatusCodeDictionary}
 */
const statusCodeDictionary: StatusCodeDictionary = {
  /**
   * Status para requisição inválida.
   */
  400: HttpStatus.BAD_REQUEST,

  /**
   * Status para request inválida.
   */
  404: HttpStatus.NOT_FOUND,

  /**
   * Status para conflito de informações.
   */
  409: HttpStatus.CONFLICT,
};

export class CustomException extends HttpException {
  constructor({ errorCode, errorDescription, statusCode }: ExceptionParams) {
    super(
      {
        error_code: errorCode,
        error_description: errorDescription,
      },
      statusCodeDictionary[statusCode],
    );
  }
}
