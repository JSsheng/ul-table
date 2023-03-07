import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { ProjectListReq, ProjectDataReq  } from './types';

export function getReportList(data: ProjectListReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/report/projs',
    method: 'post',
    data
  });
}

export function getReportData(data: ProjectDataReq): AxiosPromise<any> {
  return request({
    url: `/api/v1/report/projs/${data.projName}`,
    method: 'post',
  });
}