import { Link } from 'react-router-dom'
import { FiHome, FiMail, FiUsers, FiMenu, FiShoppingBag } from 'react-icons/fi'
import { FaGaugeHigh } from 'react-icons/fa6'
import { useUser } from '../../context/UserContext'
import AuthButtons from './AuthButtons'
import Cart from './Cart'
import UserDropDown from './UserDropDown'
import { storeConfig } from '../../config/storeConfig'

const Navbar = () => {
    const { loading, userInfo } = useUser()
    const goToStart = (event) => {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        )
            return
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        event.currentTarget.blur()
    }

    return (
        <header className="relative z-40 py-3">
            <nav className="navbar min-h-16 rounded-2xl border border-white/20 bg-gradient-to-r from-amber-800 via-rose-700 to-stone-800 px-2 shadow-lg shadow-indigo-950/15 sm:px-4 lg:px-5">
                <div className="navbar-start min-w-0 gap-1 sm:gap-2">
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-circle btn-ghost text-white hover:bg-white/15"
                            aria-label="Abrir menú de navegación"
                        >
                            <FiMenu className="h-6 w-6" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-50 mt-3 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-base-300 bg-base-100 p-2 text-base-content shadow-xl"
                        >
                            <li>
                                <Link
                                    to="/"
                                    onClick={goToStart}
                                    className="gap-3 py-3"
                                >
                                    <FiHome />
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    onClick={goToStart}
                                    className="gap-3 py-3"
                                >
                                    <FiUsers />
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    onClick={goToStart}
                                    className="gap-3 py-3"
                                >
                                    <FiMail />
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="gap-3 py-3 font-semibold text-primary"
                                >
                                    <FiShoppingBag />
                                    Tienda
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link
                        to="/"
                        onClick={goToStart}
                        className="min-w-0 whitespace-nowrap text-base font-extrabold tracking-tight text-white sm:text-xl"
                    >
                        <span>{storeConfig.name}</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-1 px-1">
                        <li>
                            <Link
                                to="/"
                                onClick={goToStart}
                                className="text-white hover:bg-white/15"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={goToStart}
                                className="text-white hover:bg-white/15"
                            >
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={goToStart}
                                className="text-white hover:bg-white/15"
                            >
                                Contacto
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="bg-white font-bold text-stone-800 shadow-sm hover:bg-white/90"
                            >
                                Tienda
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end min-w-0 gap-1 sm:gap-2">
                    <AuthButtons />
                    {userInfo?.isAdmin && (
                        <Link
                            className="btn hidden h-11 min-h-0 rounded-full border-0 bg-slate-900 px-3 text-white shadow-sm hover:bg-slate-700 sm:inline-flex sm:px-4"
                            to="/admin/dashboard"
                            aria-label="Ir al panel de administración"
                        >
                            <FaGaugeHigh className="text-base" />
                            <span className="hidden xl:inline">
                                Administración
                            </span>
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
