import { getBaseinsList, getStinsList, getAccinsList } from '../api/instrument';
import { getAppStatList, getWorkerStatList } from "../api/hawkeye";
import { BaseinsReq, StinsReq, AccinsReq, AppStateReq, WorkerStateReq } from "../api/types"


export const genTable = async(
  type: string,
  params: BaseinsReq | AccinsReq | StinsReq | AppStateReq | WorkerStateReq
): Promise<any> => {
  switch (type) {
    case 'strategy':
      return await getStinsList(params as StinsReq);
    case 'account':
      return await getAccinsList(params as AccinsReq)
    case 'base':
      return await getBaseinsList(params as BaseinsReq);
    case 'app':
      return await getAppStatList(params as AppStateReq);
    case 'worker':
      return await getWorkerStatList(params as WorkerStateReq);
  }
}

export const B2G = (value: number): string => {
  return (value / 1024 / 1024 / 1024).toFixed(1) + 'G';
}