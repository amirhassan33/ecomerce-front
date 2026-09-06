import { useUser } from '../../context/UserContext'
import toast from 'react-hot-toast'
import { logoutService } from '../../services/authServices'

const UserDropDown = () => {
    const { setUserInfo } = useUser()

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
                className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow"
            >
                <li>
                    <a className="justify-between">
                        Profile <span className="badge">Nuevo</span>
                    </a>
                </li>
                <li>
                    <a className="justify-between">Settings</a>
                </li>
                <li>
                    <a onClick={handleLogout} className="justify-between">
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown
