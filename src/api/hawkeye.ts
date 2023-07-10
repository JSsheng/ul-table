import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { AppStateReq, WorkerStateReq, OFFBtn } from './types';

export function getAppStatList(data: AppStateReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/tower/apps/get',
    method: 'post',
    data
  });
}

export function getWorkerStatList(data: WorkerStateReq): AxiosPromise<any> {
  return request({
    url: `/api/v1/tower/worker/get`,
    method: 'post',
    data
  });
}

export function oFFBtn(data: OFFBtn): AxiosPromise<any> {
  return request({
    url: `/api/v1/tower/app/switch`,
    method: 'post',
    data
  });
}