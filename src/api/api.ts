import { ZodSchema } from 'zod';

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const getClient = async () => {
  return {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 25000,
    headers: {
      // authorization: token, // TODO: add after auth is implemented
      'Content-Type': 'application/json',
    },
  };
};

const parseResponse = async <T>(
  response: Response,
  Schema?: ZodSchema
): Promise<APIResponse<T>> => {
  let res;
  try {
    if (!response.ok) {
      throw new Error();
    }
    res = await response.json();
  } catch (error) {
    return Promise.reject({
      status: response.status,
      error: response.statusText,
      message: `${response.status} ${response.statusText}`,
    });
  }

  if (Schema) {
    try {
      const data = Schema.parse(res.data);
      return {
        ...res,
        data,
      };
    } catch (error) {
      console.log('Error: ', error);
      return Promise.reject({
        status: response.status,
        error: 'Invalid response',
        message: 'Response does not match the expected schema',
      });
    }
  }

  return res;
};

export const get = async <T>(endpoint: string, Schema?: ZodSchema<T>): Promise<APIResponse<T>> => {
  const client = await getClient();
  const request = { ...client, method: 'GET' };
  const res = await fetch(endpoint, request);
  return parseResponse(res, Schema);
};

export const post = async <T>(
  endpoint: string,
  data: object,
  Schema?: ZodSchema
): Promise<APIResponse<T>> => {
  const client = await getClient();
  const request = { ...client, method: 'POST', body: JSON.stringify(data) };
  const res = await fetch(endpoint, request);
  return parseResponse(res, Schema);
};

export const patch = async <T>(
  endpoint: string,
  data: object,
  Schema?: ZodSchema
): Promise<APIResponse<T>> => {
  const client = await getClient();
  const request = { ...client, method: 'PATCH', body: JSON.stringify(data) };
  const res = await fetch(endpoint, request);
  return parseResponse(res, Schema);
};

export const put = async <T>(
  endpoint: string,
  data: object,
  Schema?: ZodSchema
): Promise<APIResponse<T>> => {
  const client = await getClient();
  const request = { ...client, method: 'PUT', body: JSON.stringify(data) };
  const res = await fetch(endpoint, request);
  return parseResponse(res, Schema);
};
