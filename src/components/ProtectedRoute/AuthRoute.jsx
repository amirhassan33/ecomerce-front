import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const AuthRoute = ({ children }) => {
    const { userInfo, loading } = useUser()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (!userInfo?.id) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        )
    }

    return children
}

export default AuthRoute
