import React, { createContext, useContext, useMemo, useState } from 'react'
import { createAPI } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const api = useMemo(() => createAPI(token), [token])
  const isAuthed = Boolean(token)

  function login(nextToken){ localStorage.setItem('token', nextToken); setToken(nextToken) }
  function logout(){ localStorage.removeItem('token'); setToken('') }

  return <AuthContext.Provider value={{ token, isAuthed, api, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
