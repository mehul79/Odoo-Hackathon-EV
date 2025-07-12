import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/checkAuth')
        setIsAuthenticated(res.data.authenticated)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await api.post('/logout')
      navigate('/signin')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3B7D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please log in to access this page.</p>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-[#2A3B7D] text-white px-4 py-2 rounded hover:bg-[#1e2a5a]"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#2A3B7D]">
              Welcome to CivicSentinel
            </h1>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Successfully Logged In!
            </h2>
            <p className="text-green-700">
              You have successfully authenticated and reached the home page. 
              The login cookies have been set correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Authentication Status</h3>
              <p className="text-blue-700">
                Status: <span className="font-bold text-green-600">Authenticated</span>
              </p>
              <p className="text-sm text-blue-600 mt-2">
                Your session is active and cookies are properly set.
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Test Instructions</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Check browser dev tools for cookies</li>
                <li>• Look for `accessToken` and `refreshToken`</li>
                <li>• Both should be HttpOnly cookies</li>
                <li>• Try logging out to clear cookies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
