import { ERROR_MESSAGES, API_ENDPOINTS } from './constants'

// API utility functions with proper error handling
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// Fetch wrapper with timeout and retry logic
export const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new ApiError(
        ERROR_MESSAGES[response.status] || `HTTP error! status: ${response.status}`,
        response.status
      )
    }

    return response
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408)
    }
    
    if (error instanceof ApiError) {
      throw error
    }
    
    throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR, 0)
  }
}

// Retry logic for failed requests
export const fetchWithRetry = async (url, options = {}, maxRetries = 3, delay = 1000) => {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchWithTimeout(url, options)
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries) {
        break
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError
}

// API request helper
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_ENDPOINTS.BASE_URL}${endpoint}`
  
  try {
    const response = await fetchWithRetry(url, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Common HTTP methods
export const api = {
  get: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
  patch: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    ...options, 
    method: 'PATCH', 
    body: JSON.stringify(data) 
  })
}
