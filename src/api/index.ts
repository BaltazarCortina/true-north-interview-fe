import { getAuth } from 'firebase/auth';
import { ZodSchema } from 'zod';

import firebaseApp from '@/lib/firebase';

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const getClient = async () => {
  const token = await getAuth(firebaseApp).currentUser?.getIdToken();
  const storedToken = sessionStorage.getItem('token') || '';

  return {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 25000,
    headers: {
      authorization: token ?? storedToken,
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
    res = await response.json();
  } catch (error) {
    return Promise.reject({
      status: response.status,
      error,
      message: `${response.status} ${response.statusText}`,
    });
  }

  if (!response.ok) {
    return Promise.reject({
      status: response.status,
      message: res.message || 'An error occurred',
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
      return Promise.reject({
        status: response.status,
        error,
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
  data: object = {},
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
