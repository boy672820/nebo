import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  Delete as NestDelete,
  Get as NestGet,
  Head as NestHead,
  Options as NestOptions,
  Patch as NestPatch,
  Post as NestPost,
  Put as NestPut,
} from '@nestjs/common';
import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger';

type MethodName =
  | 'post'
  | 'get'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'options';

type EndpointArgs = {
  path?: string;
  httpCode?: HttpStatus;
} & ApiOperationOptions;

const methodDecorators: Record<
  MethodName,
  | typeof NestPost
  | typeof NestGet
  | typeof NestPut
  | typeof NestDelete
  | typeof NestPatch
  | typeof NestHead
  | typeof NestOptions
> = {
  post: NestPost,
  get: NestGet,
  put: NestPut,
  delete: NestDelete,
  patch: NestPatch,
  head: NestHead,
  options: NestOptions,
};

/**
 * 요처에 대한 정보를 정의
 * @param param0 요청 메소드, 경로, Swagger 옵션
 * @param decorators NestJS 데코레이터
 * @returns NestJS 데코레이터
 */
function Endpoint(
  method: MethodName,
  { path, httpCode, ...options }: EndpointArgs,
  ...decorators: any[]
) {
  return applyDecorators(
    methodDecorators[method](path || ''),
    HttpCode(httpCode || HttpStatus.OK),
    ApiOperation(options || {}),
    ...decorators,
  );
}

// ----------------------------------------------------------------
// 요청 메소드에 대한 데코레이터
// ----------------------------------------------------------------

export function Post(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'post',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}

export function Get(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'get',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}

export function Put(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'put',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}

export function Delete(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'delete',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}

export function Patch(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'patch',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}

export function Head(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'head',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}

export function Options(args?: EndpointArgs | string, ...decorators: any[]) {
  return Endpoint(
    'options',
    typeof args === 'string' ? { path: args } : args || {},
    ...decorators,
  );
}
