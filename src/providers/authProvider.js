'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({ loading: false, currentUser: null })

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      setCurrentUser(user)
    }
    setLoading(false)
  }, [])

  const signin = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, signin, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
