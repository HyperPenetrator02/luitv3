import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import { analyticsApi, getEnv } from '../api'

export default function MainPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [analytics, setAnalytics] = useState({
    totalReports: 0,
    totalCleanings: 0
  })
  const [showContent, setShowContent] = useState(false)
  const [platform, setPlatform] = useState({ is_desktop: false, platform_detected: "Cloud" })
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024)

  useEffect(() => {
    setShowContent(true)
    fetchGlobalAnalytics()
    fetchEnvironment()

    const handleResize = () => setIsMobileView(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Persist dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const fetchEnvironment = async () => {
    try {
      const response = await getEnv()
      setPlatform(response.data)
    } catch (error) {
      console.error('Failed to fetch environment:', error)
    }
  }

  const fetchGlobalAnalytics = async () => {
    try {
      const response = await analyticsApi.getGlobalAnalytics()
      setAnalytics({
        totalReports: response.data.totalReports,
        totalCleanings: response.data.totalCleanings
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  const facts = [
    "The Brahmaputra River supports 150 million people across India and Bangladesh",
    "Every kg of plastic collected from rivers prevents marine life deaths",
    "Brahmaputra cleanup efforts have removed over 50 tons of plastic in 2025",
    "Clean rivers improve water quality for 2 billion people worldwide",
    "River cleanups reduce water pollution by up to 40% in 6 months",
    "The Brahmaputra is the 2nd largest river by discharge volume in the world",
    "Volunteering in river cleanups creates a healthier ecosystem for future generations",
    "Community cleanups inspire 5x more participation in environmental conservation",
    "Protected river ecosystems support fish stocks that feed millions",
    "Clean Brahmaputra means better drinking water for 50+ million people"
  ]

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
        @keyframes slideInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-in; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-slideInScale { animation: slideInScale 0.8s ease-out; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
      `}</style>

      {/* Header */}
      <header className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-0 z-40 transition-colors animate-slideDown`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-4xl">💧</span>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>LUIT</h1>
              {platform.is_desktop && (
                <span className="text-[10px] bg-cyan-100 text-cyan-700 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider block">
                  {isMobileView ? 'Mobile View' : 'Desktop Version'}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-2 py-1 rounded-md text-sm transition transform hover:scale-110 ${darkMode
                ? 'bg-slate-700 text-yellow-300 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-4 py-2 ${darkMode ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg text-sm font-medium transition transform hover:scale-105`}
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`px-4 py-2 ${darkMode ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg text-sm font-medium transition transform hover:scale-105`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 max-w-7xl mx-auto px-4 py-8 w-full ${showContent ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="space-y-8">
            {/* Hero Section */}
            <section className={`text-center p-8 rounded-2xl border ${darkMode
              ? 'bg-gradient-to-br from-slate-900 to-cyan-900 border-cyan-700'
              : 'bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 border-cyan-200 shadow-xl'
              } transition-colors animate-slideUp stagger-1 transform hover:-translate-y-1`}>
              <h2 className={`text-5xl lg:text-6xl font-bold mb-4 ${darkMode ? 'text-cyan-300' : 'text-blue-800'} animate-slideInScale`}>
                🌊 Clean Brahmaputra River
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? 'text-cyan-100' : 'text-gray-700'}`}>
                Join us in cleaning and protecting the Brahmaputra River. Report garbage, participate in cleanups, and make a difference!
              </p>
              <button
                onClick={() => navigate('/login')}
                className={`px-8 py-4 rounded-xl text-white font-bold text-xl transition transform hover:scale-105 active:scale-95 ${darkMode ? 'bg-cyan-600' : 'bg-blue-600'
                  }`}
              >
                🍃 Join the Movement
              </button>
            </section>

            {/* Global Analytics */}
            <section className={`rounded-xl shadow-md p-8 grid grid-cols-2 gap-4 border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-50'
              } transition-colors animate-slideUp stagger-5 transform hover:-translate-y-1`}>
              <div className="text-center border-r border-gray-100 dark:border-slate-700">
                <p className={`text-5xl font-bold ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
                  {analytics.totalReports.toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Places Reported</p>
              </div>
              <div className="text-center">
                <p className={`text-5xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  {analytics.totalCleanings.toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Places Cleaned</p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* How It Works */}
            <section className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-cyan-700' : 'bg-white border-cyan-100 shadow-md'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-cyan-300' : 'text-gray-800'}`}>
                How It Works
              </h3>
              <div className="space-y-4">
                <div className={`flex gap-4 p-4 rounded-xl border ${darkMode ? 'bg-slate-700 border-cyan-700' : 'bg-white border-cyan-100 shadow-sm'} transition-colors transform hover:scale-105`}>
                  <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-cyan-200' : 'text-gray-800'}`}>Report Garbage</p>
                    <p className="text-sm opacity-70">Spot garbage? Take a photo and report it to your location</p>
                  </div>
                </div>
                <div className={`flex gap-4 p-4 rounded-xl border ${darkMode ? 'bg-slate-700 border-cyan-700' : 'bg-white border-cyan-100 shadow-sm'} transition-colors transform hover:scale-105`}>
                  <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-cyan-200' : 'text-gray-800'}`}>Join Cleanup</p>
                    <p className="text-sm opacity-70">See reported areas and volunteer to clean them</p>
                  </div>
                </div>
                <div className={`flex gap-4 p-4 rounded-xl border ${darkMode ? 'bg-slate-700 border-cyan-700' : 'bg-white border-cyan-100 shadow-sm'} transition-colors transform hover:scale-105`}>
                  <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-cyan-200' : 'text-gray-800'}`}>Earn Points</p>
                    <p className="text-sm opacity-70">Get rewarded with points and climb the leaderboard</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fact Card */}
            <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-700 border-cyan-700' : 'bg-white border-cyan-100 shadow-md'} italic font-medium`}>
              "{facts[Math.floor(Math.random() * facts.length)]}"
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => navigate('/report')} className="p-4 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition transform hover:scale-105">📸 Report</button>
              <button onClick={() => navigate('/leaderboard')} className="p-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition transform hover:scale-105">🏆 Leaderboard</button>
              <button onClick={() => navigate('/analytics')} className="p-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition transform hover:scale-105 col-span-2">📊 Analytics</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'} py-8 text-center transition-colors animate-slideUp`}>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Made with 💙 by <span className={`font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>LuitLabs</span>
        </p>
      </footer>
    </div>
  )
}
