import { InnerTableRow } from "@/views/strategy/index.vue"

// login
export interface LoginData {
  userName: string;
  password: string;
  appType?: number
}

// report
export interface ProjectListReq {
  projRe: string
}

export interface ProjectDataReq {
  projName: string
}

// response
// from backend
export interface RawResponse {
  code: number;
  data?: any;
  message?: null | string
}

// to business layer
export interface Response {
  code: number;
  data: any;
  message: string
}

// basecamp
export interface BaseinsReq {
  ins?: string
  sn?: number
}
export interface StinsReq {
  stIns?: string
  sn?: number
}
export interface AccinsReq {
  accIns?: string
  sn?: number
}

// hawkeye
export interface AppStateReq {
  appId?: string
  sn?: number
}

export interface WorkerStateReq {
  workerId?: string
  sn?: number
}

export interface OFFBtn{
  workerId: string
  appName: string
  switch: boolean
  sn: number
}

// monitor
export interface SubListReq {
  itemPath: string
  sn?: number
}

export interface KVStore {
  key: string,
  isPre: boolean
  sn?: number
}

export interface KVStoreEditReq {
  item: KVStoreEdit
  sn: number
}

export interface KVStoreEdit {
  key: string
  value: string
  ver?: string
}

export interface KVStoreDelReq {
  keys: string[]
  sn?: number
}

// strategy
export interface StrategyListReq {
  tplName: string
  sn?: number
}

export interface StrategySetReq {
  TplName: string
  items: InnerTableRow[]
}

export interface StrategyAddReq {
  TplName: string
  des: string
  sn: number
}

export interface StrategyDelReq {
  item: string
}

// log
export interface GetLogTxt {
  workerId: string
  appName: string
  lineCnt: string
  sn?: number
  keys: string[]
}
