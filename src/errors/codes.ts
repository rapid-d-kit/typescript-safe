import type { LooseAutocomplete } from '@rapid-d-kit/types';

import { assertNumeric } from '../asserts';


export enum ERROR_CODE {
  ERR_UNKNOWN_ERROR = 1001,
  ERR_RESOURCE_DISPOSED = 1002,
  ERR_RESOURCE_LOCKED = 1003,
  ERR_TIMEOUT = 1004,
  ERR_TOKEN_CANCELLED = 1005,
  ERR_END_OF_STREAM = 1006,
  ERR_INVALID_ARGUMENT = 1007,
  ERR_INVALID_TYPE = 1008,
  ERR_UNSUPPORTED_OPERATION = 1009,
  ERR_RESOURCE_FROZEN = 1010,
  ERR_AVOID_DIVISION_BY_ZERO = 1011,
  ERR_CONSTRAINT_VIOLATION = 1012,
  ERR_UNEXPECTED_PROMISE = 1013,
}


const extendedCodes: Record<string, number> = {};
const $codeHolder = Symbol('ERROR::INTERNAL_DESCRIPTOR.Code');


export class ErrorCode {
  public static extend<K extends string>(codes: readonly K[]): void {
    const maxValue = Math.max(
      ...Object.values(ERROR_CODE).filter(item => typeof item === 'number'),
      ...Object.values(extendedCodes) // eslint-disable-line comma-dangle
    );

    let validCount = 0;

    for(let i = 0; i < codes.length; i++) {
      const currentCode = codes[i].toUpperCase().trim();

      if(
        !!ERROR_CODE[currentCode as keyof typeof ERROR_CODE] ||
        !!extendedCodes[currentCode]
      ) continue;

      const absCode = maxValue + validCount + 1;
      extendedCodes[currentCode] = absCode;
      validCount++;
    }
  }

  public static for(code: LooseAutocomplete<keyof typeof ERROR_CODE>): ErrorCode {
    let ncode = ERROR_CODE[code as keyof typeof ERROR_CODE] || extendedCodes[code as string] || ERROR_CODE.ERR_UNKNOWN_ERROR;

    if(typeof ncode !== 'number') {
      ncode = ERROR_CODE.ERR_UNKNOWN_ERROR;
    }

    return new ErrorCode(ncode);
  }

  private readonly [$codeHolder]: number;

  private constructor(code: number) {
    assertNumeric(code);
    this[$codeHolder] = -Math.abs(code);
  }

  public getCode(): number {
    return this[$codeHolder];
  }

  public valueOf(): number {
    return this[$codeHolder];
  }
}
