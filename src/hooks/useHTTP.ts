import { useState } from 'react'

export type LoadingStatus = 'idle' | 'loading' | 'error'
type HTTPRequestMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface IHTTPHeaders {
  [key: string]: string
}

interface IRequestConfig {
  url: string
  method?: HTTPRequestMethods
  body?: string | null
  headers?: IHTTPHeaders
}

const useHTTP = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')

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
