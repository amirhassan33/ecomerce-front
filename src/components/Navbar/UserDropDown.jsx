import { useUser } from '../../context/UserContext'
import toast from 'react-hot-toast'
import { logoutService } from '../../services/authServices'
import { Link } from 'react-router-dom'
import { FaBoxOpen, FaRightFromBracket, FaUserShield } from 'react-icons/fa6'

const UserDropDown = () => {
    const { userInfo, setUserInfo } = useUser()

    const handleLogout = async () => {
        try {
            await logoutService()
            setUserInfo({})
            toast.success('Sesion cerrada correctamente')
        } catch (error) {
            console.error('Error al cerrar sesion', error)
            toast.error('Error al iniciar sesion intente mas tarde')
        }
    }

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                aria-label="Abrir menú de usuario"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-500 to-violet-700 text-base font-bold uppercase text-white shadow-sm ring-1 ring-base-300 transition hover:scale-105"
            >
                {userInfo?.username?.charAt(0) || 'U'}
            </div>
            <div
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box z-50 mt-3 w-72 border border-base-300 shadow-xl overflow-hidden"
            >
                <div className="px-4 py-4 border-b border-base-300 bg-base-200/60">
                    <p className="font-bold truncate">
                        {userInfo?.username || 'Mi cuenta'}
                    </p>
                    <p className="text-sm text-base-content/60 truncate">
                        {userInfo?.email}
                    </p>
                </div>

                <ul className="menu menu-sm p-2">
                    <li>
                        <Link to="/orders" className="flex gap-3 py-3">
                            <FaBoxOpen />
                            Mis órdenes
                        </Link>
                    </li>

                    {userInfo?.isAdmin && (
                        <li>
                            <Link
                                to="/admin/dashboard"
                                className="flex gap-3 py-3"
                            >
                                <FaUserShield />
                                Panel de administración
                            </Link>
                        </li>
                    )}

                    <li className="border-t border-base-300 mt-1 pt-1">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex gap-3 py-3 text-error hover:bg-error/10"
                        >
                            <FaRightFromBracket />
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserDropDown
