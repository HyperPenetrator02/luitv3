import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store'

// Pages
import MainPage from './pages/MainPage'
import LoginRegister from './pages/LoginRegister'
import UserDashboard from './pages/UserDashboard'
import NgoDashboard from './pages/NgoDashboard'
import ReportingPage from './pages/ReportingPage'
import CleanerPage from './pages/CleanerPage'
import CleaningPage from './pages/CleaningPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AdminDashboard from './pages/AdminDashboard'
import AnalyticsPage from './pages/AnalyticsPage'

function App() {
  const user = useAuthStore((state) => state.user)
  const userType = useAuthStore((state) => state.userType)
  const hydrated = useAuthStore((state) => state.hydrated)

  if (!hydrated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f9ff' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>Loading LUIT v3...</p>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <MainPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginRegister />} />
        <Route path="/report" element={<ReportingPage />} />

        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={
          !user ? <Navigate to="/login" /> :
            userType === 'individual' ? <UserDashboard /> :
              userType === 'ngo' ? <NgoDashboard /> :
                <Navigate to="/" />
        } />

        {/* Other Protected User Routes */}
        {user && (
          <>
            <Route path="/cleaner" element={<CleanerPage />} />
            <Route path="/cleaning/:reportId" element={<CleaningPage />} />
          </>
        )}

        {/* Leaderboard - Public */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
