import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const AuthButtons = () => {
    const { userInfo, loading } = useUser()

    // No mostrar los botones mientras se comprueba la sesión
    // ni cuando el usuario ya está conectado
    if (loading || userInfo?.id) {
        return null
    }

    return (
        <div className="py-4 flex justify-center items-center gap-4 flex-wrap">
            <Link className="btn btn-neutral btn-outline" to="/register">
                Create Account
            </Link>

            <div className="hidden lg:block">|</div>

            <Link className="btn btn-neutral btn-outline" to="/login">
                Initialize
            </Link>
        </div>
    )
}

export default AuthButtons
