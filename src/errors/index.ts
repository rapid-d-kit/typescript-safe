import type { LooseAutocomplete } from '@rapid-d-kit/types';

import { ERROR_CODE, ErrorCode } from './codes';

export * from './codes';
export { Exception, errorDescription } from './exception';


export function isKnownError(err: any, code: ErrorCode | LooseAutocomplete<keyof typeof ERROR_CODE>): boolean {
  if(!(code instanceof ErrorCode)) {
    code = ErrorCode.for(code);
  }

  return typeof err === 'object' && typeof err.errorCode === 'number' && err.errorCode === code.getCode();
}
