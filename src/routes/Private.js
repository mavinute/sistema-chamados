import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/auth'

export function Private({ children }) {
    const { signed, loading } = useContext(AuthContext)

    //retor true se não esta logado, retorna false se estiver logado
    if (loading) {
        return <div></div>
    }

    if (!signed) {
        return <Navigate to="/" />
    }

    return children
}