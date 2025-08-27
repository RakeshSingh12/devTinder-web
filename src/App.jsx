import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { Suspense, lazy } from "react"
import appStore from "./utils/appStore"
import ErrorBoundary from "./components/ErrorBoundary"
import { ROUTES, APP_CONFIG } from "./utils/constants"

// Lazy load components for better performance and code splitting
const Body = lazy(() => import("./components/Body"))
const Login = lazy(() => import("./components/Login"))
const Feed = lazy(() => import("./components/Feed"))
const Profile = lazy(() => import("./components/Profile"))
const Connections = lazy(() => import("./components/Connections"))
const Requests = lazy(() => import("./components/Requests"))
const PremiumMembership = lazy(() => import("./components/premiumMembership"))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Main App component with optimized structure
function App() {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <BrowserRouter basename={APP_CONFIG.BASENAME}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Main layout route */}
              <Route path={ROUTES.HOME} element={<Body />}>
                {/* Default route redirects to feed */}
                <Route index element={<Navigate to={ROUTES.FEED} replace />} />
                
                {/* Public routes */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                
                {/* Protected routes - you can add authentication guards here */}
                <Route path={ROUTES.FEED} element={<Feed />} />
                <Route path={ROUTES.PROFILE} element={<Profile />} />
                <Route path={ROUTES.CONNECTIONS} element={<Connections />} />
                <Route path={ROUTES.REQUESTS} element={<Requests />} />
                <Route path={ROUTES.PREMIUM_MEMBERSHIP} element={<PremiumMembership />} />
                
                {/* Catch all route for 404 */}
                <Route path="*" element={<Navigate to={ROUTES.FEED} replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
