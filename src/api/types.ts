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

// monitor
export interface SubListReq {
  itemPath: string
  sn?: number
}
