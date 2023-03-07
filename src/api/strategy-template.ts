import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { EditListReq , EditNewReq , EditSetReq} from './types';

export function getstinstplinsList(data: EditListReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/stinstpl/get',
    method: 'post',
    data
  });
}

export function getBaseinsList(data: EditNewReq): AxiosPromise<any> {
    return request({
      url: '/api/v1/stinstpl/new',
      method: 'post',
      data
    });
}

export function getsetinsList(data: EditSetReq): AxiosPromise<any> {
    return request({
      url: '/api/v1/stinstpl/set',
      method: 'post',
      data
    });
}
  
