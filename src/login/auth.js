import { useState, createContext, useContext } from 'react'

export const useAuth = () => {

  const user =localStorage.getItem('user')
  if(user){
    return true
  }else{
    return false
  }
}
/*
const AuthContext = createContext()
export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = () => {
    localStorage.setItem('user','test')
    setIsAuthenticated(true)   
  }

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
*/