import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { AppStateReq, WorkerStateReq } from './types';

export function getAppStatList(data: AppStateReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/monitor/apps/get',
    method: 'post',
    data
  });
}

export function getWorkerStatList(data: WorkerStateReq): AxiosPromise<any> {
  return request({
    url: `/api/v1/monitor/worker/get`,
    method: 'post',
    data
  });
}