import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

export const RequireAuth = ({ children }) =>{
  const auth = useAuth()
  return auth? children:<Navigate to='/login' />

}
/*
export const RequireAuth = ({ children }) => {
  const {isAuthenticated} = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  return children
}

*/