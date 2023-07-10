import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StrategyListReq, StrategySetReq, StrategyAddReq, StrategyDelReq } from './types';

export function getStrategyTmpList(data: StrategyListReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/stinstpl/get',
    method: 'post',
    data
  });
}

export function editStrategyTmp(data: { item: StrategySetReq }): AxiosPromise<any> {
  return request({
    url: '/api/v1/stinstpl/set',
    method: 'post',
    data
  });
}

export function newStrategyTmp(data: StrategyAddReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/stinstpl/new',
    method: 'post',
    data
  });
}

export function deleteStrategyTmp(data: StrategyDelReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/stinstpl/del',
    method: 'post',
    data
  });
}