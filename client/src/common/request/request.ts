import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { storage } from '../utils/store/storage'

type Header = Record<string, string>

interface Response<T = any> {
  code: number
  status: string
  data: T
}

interface RequestConfig {
  baseURL: string
  timeout: number
  header: Header
}

class ShortChain {
  private config: RequestConfig

  constructor(config: RequestConfig) {
    this.config = config
  }

  public setHeader(key: string, value: string) {
    this.config.header[key] = value
  }

  public delHeader(key: string) {
    delete this.config.header[key]
  }

  private request(method: UniNamespace.RequestOptions['method'], url: string, data: any, requestHeader: Header = {}) {
    return new Promise<UniApp.RequestSuccessCallbackResult>((success, fail) => {
      const { header, baseURL, timeout } = this.config
      uni.request({
        url: baseURL + url,
        data,
        method,
        success,
        fail,
        timeout,
        header: {
          ...header,
          ...requestHeader,
          authorization: storage.get('token') || 'token'
        }
      })
    }).then((res: UniApp.RequestSuccessCallbackResult) => {
      const data = res.data as Response
      switch (data.code) {
        case 40001:
          storage.remove('token')
          uni.redirectTo({
            url: '/pages/entry/entry'
          })
          break
        default:
          if (data.code !== 0) {
            throw new Error(data.data)
          }
      }
      return res.data
    })
  }

  public get<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.request('GET', url, data, header) as Promise<Response<T>>
  }

  public post<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.request('POST', url, data, header) as Promise<Response<T>>
  }
}

export const commonRequest = new ShortChain({
  baseURL: 'http://192.168.1.104:28257/touch',
  timeout: 20000,
  header: {}
})
