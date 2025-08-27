// Application constants and configuration
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FEED: '/feed',
  PROFILE: '/profile',
  CONNECTIONS: '/connections',
  REQUESTS: '/requests',
  PREMIUM_MEMBERSHIP: '/premiumMembership'
}

export const APP_CONFIG = {
  // Use basename only in production (GitHub Pages), not in development
  BASENAME: import.meta.env.PROD ? '/devTinder-web' : '',
  APP_NAME: 'DevTinder',
  VERSION: '1.0.0'
}

// API endpoints (if any)
export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:7777", // Local development server
  
  // Authentication endpoints
  AUTH: '/auth',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  
  // User management endpoints
  USERS: '/users',
  USER: {
    UPDATE: '/user/update',
    PROFILE: '/user/profile'
  },
  
  // Profile endpoints
  PROFILE: {
    VIEW: '/profile/view',
    EDIT: '/profile/edit',
    UPDATE: '/profile/update'
  },
  
  // Feed and matching endpoints
  FEED: '/feed',
  MATCHES: '/matches',
  
  // Connection endpoints
  CONNECTIONS: '/user/connections',
  
  // Request endpoints
  REQUESTS: {
    SEND: '/request/send',
    RECEIVED: '/user/request/received',
    REVIEW: '/request/review'
  },
  
  // Chat endpoints
  CHAT: '/chat',
  
  // Payment endpoints
  PAYMENT: {
    CREATE: '/payment/create'
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme'
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  PROFILE_UPDATE_ERROR: 'Failed to update profile. Please try again.',
  REQUIRED_FIELDS: 'First name and last name are required fields.',
  REQUEST_ERROR: 'Failed to send request. Please try again.',
  PAYMENT_ERROR: 'Failed to create payment order. Please try again.'
}
