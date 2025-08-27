// Performance optimization utilities

// Debounce function to limit how often a function can be called
export const debounce = (func, wait, immediate = false) => {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

// Throttle function to ensure a function is called at most once in a specified time period
export const throttle = (func, limit) => {
  let inThrottle
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Memoization utility for expensive calculations
export const memoize = (fn) => {
  const cache = new Map()
  
  return (...args) => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// Intersection Observer utility for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}

// Request Animation Frame utility for smooth animations
export const requestAnimationFrame = (callback) => {
  if (typeof window !== 'undefined') {
    return window.requestAnimationFrame(callback)
  }
  // Fallback for SSR
  return setTimeout(callback, 16)
}

// Cancel Animation Frame utility
export const cancelAnimationFrame = (id) => {
  if (typeof window !== 'undefined') {
    return window.cancelAnimationFrame(id)
  }
  // Fallback for SSR
  return clearTimeout(id)
}

// Performance measurement utility
export const measurePerformance = (name, fn) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  }
  return fn()
}

// Batch DOM updates utility
export const batchDOMUpdates = (updates) => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      updates.forEach(update => update())
      requestAnimationFrame(resolve)
    })
  })
}
