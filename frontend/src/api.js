import axios from 'axios'

// Use environment variable or default to localhost
let API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim();

// 🛠️ REAL-TIME DEBUGGING: Allow overriding API via URL param (?api=https://...)
const urlParams = new URLSearchParams(window.location.search);
const overrideApi = urlParams.get('api');
if (overrideApi) {
  console.log('🛠️ OVERRIDING API URL:', overrideApi);
  API_BASE = overrideApi.trim();
}

// 🚨 REMOVE ALL TRAILING SLASHES AND HIDDEN WHITESPACE
API_BASE = API_BASE.replace(/\/+$/, '');

// 🚨 FORCE HTTPS FOR PRODUCTION RAILWAY DOMAINS
if (API_BASE.includes('railway.app')) {
  if (API_BASE.startsWith('http:')) {
    API_BASE = API_BASE.replace('http:', 'https:');
  } else if (!API_BASE.startsWith('https:')) {
    API_BASE = 'https://' + API_BASE;
  }
}

// Ensure the URL is valid
try {
  new URL(API_BASE);
} catch (e) {
  console.error('❌ INVALID API URL CONFIGURED:', API_BASE);
}

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000  // 30 second timeout for large image uploads
})

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log(`📡 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  error => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log(`✅ API Response: ${response.status} ${response.statusText}`)
    return response
  },
  error => {
    console.error('❌ Response Error:', error.message)
    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Data:', error.response.data)
    }
    return Promise.reject(error)
  }
)

// Environment detection
export const getEnv = () => api.get('/env')

// Auth endpoints
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout')
}

// Reporting endpoints
export const reportingApi = {
  uploadImage: (imageBase64) => api.post('/reporting/upload-image', { image_base64: imageBase64 }),
  verifyImage: (imageBase64) => api.post('/reporting/verify-image', { image_base64: imageBase64 }),
  deleteImage: (public_id) => api.post('/reporting/delete-image', { public_id }),
  checkLocation: (latitude, longitude) => api.post('/reporting/check-location', { latitude, longitude }),
  createReport: (data) => api.post('/reporting/report', data),
  getReports: (wasteType, limit) => api.get('/reporting/reports', {
    params: { wasteType, limit }
  }),
  getReport: (reportId) => api.get(`/reporting/reports/${reportId}`)
}

// Cleaning endpoints
export const cleaningApi = {
  verifyCleaning: (data) => api.post('/cleaning/verify', data),
  markCleaned: (data) => api.post('/cleaning/mark-cleaned', data),
  getAvailableCleanings: (wasteType, userType) => api.get('/cleaning/available', {
    params: { wasteType, userType }
  })
}

// Analytics endpoints
export const analyticsApi = {
  getUserAnalytics: (userId) => api.get(`/analytics/user/${userId}`),
  getNgoAnalytics: (ngoId) => api.get(`/analytics/ngo/${ngoId}`),
  getGlobalAnalytics: () => api.get('/analytics/global'),
  getTimeBuckets: () => api.get('/analytics/time-buckets'),
  getUsersLeaderboard: (category = 'overall', limit = 20) =>
    api.get('/analytics/leaderboard/users', { params: { category, limit } }),
  getNgosLeaderboard: (category = 'overall', limit = 20) =>
    api.get('/analytics/leaderboard/ngos', { params: { category, limit } })
}

// Location endpoints
export const locationApi = {
  getNearbyReports: (latitude, longitude, radius = 100) =>
    api.get('/location/nearby-reports', { params: { latitude, longitude, radius } }),
  validateCoordinates: (latitude, longitude) =>
    api.get('/location/validate-coordinates', { params: { latitude, longitude } }),
  checkDuplicateLocation: (latitude, longitude, radius = 100) =>
    api.post('/location/check-duplicate', { latitude, longitude, radius })
}
