import { useState } from 'react'

export type TLoadingStatus = 'idle' | 'loading' | 'error'
type THTTPRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE'
interface IHTTPHeaders {
  [key: string]: string
}

interface IRequestConfig {
  url: string
  method?: THTTPRequestMethods
  body?: string | null
  headers?: IHTTPHeaders
}

const useHTTP = () => {
  const [loadingStatus, setLoadingStatus] = useState<TLoadingStatus>('idle')

  const request = async ({
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
  }: IRequestConfig) => {
    setLoadingStatus('loading')

    try {
      const response = await fetch(url, { method, body, headers })

      if (!response.ok) {
        throw new Error(`?Could not fetch ${url}, status: ${response.status}`)
      }

      const result = await response.json()

      setLoadingStatus('idle')
      return result
    } catch (error) {
      setLoadingStatus('error')
      console.error(error)
      throw error
    }
  }

  return { loadingStatus, request }
}

export { useHTTP }
