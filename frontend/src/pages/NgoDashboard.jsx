import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import { analyticsApi, getEnv } from '../api'

export default function NgoDashboard() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [platform, setPlatform] = useState({ is_desktop: false })
  const [analytics, setAnalytics] = useState({
    reportsCount: 0,
    cleaningsCount: 0,
    totalPoints: 0,
    ngoRank: 0
  })
  const [globalAnalytics, setGlobalAnalytics] = useState({
    totalReports: 0,
    totalCleanings: 0
  })
  const [showContent, setShowContent] = useState(false)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024)

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    setShowContent(true)
    if (user?.id) {
      fetchAnalytics(user.id)
    }
    fetchGlobal()
    fetchEnvironment()

    const handleResize = () => setIsMobileView(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [user])

  const fetchEnvironment = async () => {
    try {
      const response = await getEnv()
      setPlatform(response.data)
    } catch (error) {
      console.error('Failed to fetch environment:', error)
    }
  }

  const fetchAnalytics = async (ngoId) => {
    try {
      const response = await analyticsApi.getNgoAnalytics(ngoId)
      setAnalytics(response.data)

      try {
        const leaderboardRes = await analyticsApi.getNgoLeaderboard('overall')
        const leaderboard = leaderboardRes.data.leaderboard || []
        const ngoRankIndex = leaderboard.findIndex(entry => entry.id === ngoId)
        const ngoRank = ngoRankIndex !== -1 ? ngoRankIndex + 1 : '-'
        setAnalytics(prev => ({ ...prev, ngoRank }))
      } catch (err) {
        console.error('Failed to fetch rank:', err)
      }
    } catch (error) {
      console.error('Failed to fetch NGO analytics:', error)
    }
  }

  const fetchGlobal = async () => {
    try {
      const response = await analyticsApi.getGlobalAnalytics()
      setGlobalAnalytics({
        totalReports: response.data.totalReports,
        totalCleanings: response.data.totalCleanings
      })
    } catch (error) {
      console.error('Failed to fetch global analytics:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${darkMode
      ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white'
      : 'bg-gradient-to-b from-blue-50 to-green-50 text-gray-800'
      }`}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-in; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Header */}
      <header className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-0 z-40 transition-colors animate-slideDown`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-4xl">💧</span>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-amber-400' : 'text-blue-600'}`}>LUIT NGO</h1>
              <div className="flex items-center gap-2">
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome, {user?.name}</p>
                {platform.is_desktop && (
                  <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-1 rounded-full uppercase">
                    {isMobileView ? 'Mobile' : 'Desktop'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-2 py-1 rounded-md text-sm transition transform hover:scale-110 ${darkMode ? 'bg-slate-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 max-w-7xl mx-auto px-4 py-8 w-full ${showContent ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            {/* NGO Hero */}
            <section className={`p-8 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-slate-800 to-amber-900/20 shadow-xl' : 'bg-white border border-amber-100 shadow-lg'
              } transition-colors animate-slideUp stagger-1`}>
              <h2 className="text-4xl font-bold mb-4">🌊 Protecting the Brahmaputra</h2>
              <p className="text-lg opacity-80">Drive community cleanups, manage hotspot reports, and lead the movement for a cleaner environment.</p>
            </section>

            {/* Global Stats */}
            <section className="grid grid-cols-2 gap-4 animate-slideUp stagger-2">
              <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-100'} shadow-sm text-center`}>
                <p className="text-4xl font-bold text-blue-500">{globalAnalytics.totalReports}</p>
                <p className="text-sm opacity-60">Global Reports</p>
              </div>
              <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-100'} shadow-sm text-center`}>
                <p className="text-4xl font-bold text-emerald-500">{globalAnalytics.totalCleanings}</p>
                <p className="text-sm opacity-60">Global Cleanings</p>
              </div>
            </section>

            {/* Recent Hotspots Placeholder or Tip */}
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-amber-900/10 border-amber-900/30' : 'bg-amber-50 border-amber-100'}`}>
              <h4 className="font-bold flex items-center gap-2 mb-2">💡 NGO Pro Tip</h4>
              <p className="text-sm opacity-80 text-justify">Use the Hotspot Heatmap in Analytics to identify areas that need immediate attention. Regular cleanups in high-frequency reporting zones yield 2x impact points!</p>
            </div>
          </div>

          {/* User Stats Side */}
          <div className="space-y-8">
            <section className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-2xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'} shadow-xl animate-slideUp stagger-3`}>
              <h3 className="text-2xl font-bold mb-6 border-b pb-2">NGO Impact Score</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-500">{analytics.reportsCount}</p>
                  <p className="text-xs opacity-60 uppercase font-bold">Assigned</p>
                </div>
                <div className="p-4 bg-emerald-500/10 rounded-xl text-center">
                  <p className="text-3xl font-bold text-emerald-500">{analytics.cleaningsCount}</p>
                  <p className="text-xs opacity-60 uppercase font-bold">Cleaned</p>
                </div>
                <div className="p-4 bg-amber-500/10 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-500">{analytics.totalPoints}</p>
                  <p className="text-xs opacity-60 uppercase font-bold">Score</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-500">#{analytics.ngoRank}</p>
                  <p className="text-xs opacity-60 uppercase font-bold">Rank</p>
                </div>
              </div>
            </section>

            <div className="grid gap-4">
              <button onClick={() => navigate('/cleaner')} className="py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg">🧹 Manage Cleanups</button>
              <button onClick={() => navigate('/leaderboard')} className="py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">🏆 NGO Leaderboard</button>
              <button onClick={() => navigate('/analytics')} className="py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg">📊 Impact Analytics</button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'} py-8 text-center`}>
        <p className="text-sm opacity-50">NGO Access Panel | LuitLabs v3</p>
      </footer>
    </div>
  )
}
