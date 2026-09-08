import UserDropDown from './UserDropDown'
import AuthButtons from './AuthButtons'
import Cart from './Cart'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const Navbar = () => {
    const { loading, userInfo } = useUser()

    return (
        <header>
            <AuthButtons />
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-xl" to="/">
                        E-comerce
                    </Link>
                </div>
                <div className="navbar-end gap-3">
                    {userInfo?.isAdmin && (
                        <Link className="btn btn-primary" to="/admin/dashboard">
                            Dashboard
                        </Link>
                    )}
                    <Cart />
                    {!loading && userInfo?.username && <UserDropDown />}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
