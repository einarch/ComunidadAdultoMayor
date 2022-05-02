import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth"

export const InicioSesion = () => {
    const [user,setUser] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogin =()=>{
          auth.login(user)
          navigate('/')
    }
    return (
        <div>
            
        </div>
    )
}