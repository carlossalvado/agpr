import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { AuthService } from './lib/auth'
import { ThemeProvider } from './lib/theme'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const authService = AuthService.getInstance()

  useEffect(() => {
    const unsubscribe = authService.subscribe((state) => {
      setIsAuthenticated(state.isAuthenticated)
      setIsLoading(false)
    })

    // Check initial auth state
    const initialState = authService.getAuthState()
    setIsAuthenticated(initialState.isAuthenticated)
    setIsLoading(false)

    return unsubscribe
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="page-container">
        <div className="relative z-10">
          {isAuthenticated ? (
            <Dashboard />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
