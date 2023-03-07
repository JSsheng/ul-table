import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { AccinsReq, StinsReq, BaseinsReq  } from './types';

export function getBaseinsList(param: BaseinsReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/basecamp/baseins',
    method: 'get',
    params: param
  });
}

export function getStinsList(param: StinsReq): AxiosPromise<any> {
  return request({
    url: `/api/v1/basecamp/stins`,
    method: 'get',
    params: param
  });
}

export function getAccinsList(param: AccinsReq): AxiosPromise<any> {
  return request({
    url: `/api/v1/basecamp/accins`,
    method: 'get',
    params: param
  });
}