import { IOStream } from 'ndforge';
import type { ErrorOptions } from 'ndforge/io/exceptions';

import { ErrorCode, ERROR_CODE } from './codes';


export class Exception extends IOStream.Exception.Throwable {
  public override readonly name: string;
  public override readonly description: string;

  public constructor(message: string, code: ERROR_CODE | keyof typeof ERROR_CODE, options?: Omit<ErrorOptions, 'code'>) {
    const errorCode = typeof code === 'number' ? Math.abs(code | 0) : ErrorCode.for(code).getCode();

    super(message, {
      ...options,
      code: -errorCode,
    });

    this.name = 'Exception';
    this.description = _describeErrorCode(errorCode);
  }
}


function _describeErrorCode(code: number): string {
  const errorDescriptions: Record<number, string> = {
    [ERROR_CODE.ERR_UNKNOWN_ERROR]: 'An unknown error occurred in some part of the code.',
    [ERROR_CODE.ERR_RESOURCE_DISPOSED]: 'Attempted to use a stream that has already been disposed of.',
  };

  return errorDescriptions[code] || errorDescriptions[ErrorCode.for('ERR_UNKNOWN_ERROR').getCode()];
}

export function errorDescription(err: Exception): string {
  return _describeErrorCode(err.code);
}


export default Exception;
