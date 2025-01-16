export function assert(condition?: unknown, message?: string): asserts condition {
  let result: boolean = condition as any;

  if(typeof condition === 'function') {
    result = condition();
  } else if(typeof condition !== 'boolean') {
    result = !!condition;
  }

  if(!result) {
    throw new Error(message || `Assertation failed for 'typeof ${typeof result}'`);
  }
}


export function assertDefinedString(arg: unknown, message?: string): asserts arg is string {
  assert(typeof arg === 'string' && arg.trim().length > 0, message);
}

export function assertInteger(arg: unknown, message?: string): asserts arg is number {
  assert(typeof arg === 'number' && Number.isInteger(arg), message);
}

export function assertUnsignedInteger(arg: unknown, message?: string): asserts arg is number {
  assertInteger(arg, message);
  assert(arg >= 0);
}

export function assertNumeric(arg: unknown, message?: string): asserts arg is number {
  assert(typeof arg === 'number', message);
}
