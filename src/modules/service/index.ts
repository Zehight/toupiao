/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from '@/modules/service/axios'

export function updateToken(token: string) {
  // @ts-ignore
  axios.defaults.headers['Authorization'] = `Bearer ${token}`
}

// 接口
export * as Api from './services/api'
export * as Auth from './services/auth'

// 类型
export { ResponseCode } from './types/http'
export type { User } from './types/user'

