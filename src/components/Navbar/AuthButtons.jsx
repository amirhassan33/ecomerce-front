import { Link } from 'react-router-dom'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'
import { useUser } from '../../context/UserContext'

const AuthButtons = () => {
    const { userInfo, loading } = useUser()

    if (loading || userInfo?.id) return null

    return (
        <div className="flex items-center gap-2">
            <Link
                className="btn btn-ghost hidden h-11 min-h-0 rounded-full px-4 md:inline-flex"
                to="/register"
            >
                <FiUserPlus />
                Crear cuenta
            </Link>
            <Link
                className="btn h-11 min-h-0 rounded-full border-0 bg-slate-900 px-3 text-white shadow-sm hover:bg-slate-700 sm:px-4"
                to="/login"
            >
                <FiLogIn />
                <span className="hidden sm:inline">Ingresar</span>
            </Link>
        </div>
    )
}

export default AuthButtons
