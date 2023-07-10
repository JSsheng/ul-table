import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { KVStore, KVStoreEditReq, KVStoreDelReq } from './types';


export function getKVStore(data: KVStore): AxiosPromise<any> {
  return request({
    url: '/api/v1/basecamp/kvstore/get',
    method: 'get',
    params: data
  });
}

export function setKVStore(data: KVStoreEditReq ): AxiosPromise<any> {
  return request({
    url: '/api/v1/basecamp/kvstore/set',
    method: 'post',
    data
  });
}

export function delKVStore(data: KVStoreDelReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/basecamp/kvstore/del',
    method: 'post',
    data
  });
}