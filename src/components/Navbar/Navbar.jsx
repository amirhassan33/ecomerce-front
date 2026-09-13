import { Link } from 'react-router-dom'
import {
    FiBriefcase,
    FiHome,
    FiMail,
    FiMenu,
    FiShoppingBag,
    FiUsers,
} from 'react-icons/fi'
import { FaGaugeHigh } from 'react-icons/fa6'
import { useUser } from '../../context/UserContext'
import AuthButtons from './AuthButtons'
import Cart from './Cart'
import UserDropDown from './UserDropDown'

const WEBSITE_URL = 'https://desarrollowebamir.com.ar'

const websiteLinks = [
    { label: 'Inicio', href: `${WEBSITE_URL}/`, icon: FiHome },
    {
        label: 'Nosotros',
        href: `${WEBSITE_URL}/pages/nosotros.html`,
        icon: FiUsers,
    },
    {
        label: 'Servicios',
        href: `${WEBSITE_URL}/pages/loquehacemos.html`,
        icon: FiBriefcase,
    },
    {
        label: 'Contacto',
        href: `${WEBSITE_URL}/pages/contacto.html`,
        icon: FiMail,
    },
]

const Navbar = () => {
    const { loading, userInfo } = useUser()

    return (
        <header className="relative z-40 py-3">
            <nav className="navbar min-h-16 rounded-2xl border border-white/20 bg-gradient-to-r from-violet-700 via-indigo-600 to-pink-500 px-2 shadow-lg shadow-indigo-950/15 sm:px-4 lg:px-5">
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
                            {websiteLinks.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <a href={href} className="gap-3 py-3">
                                        <Icon />
                                        {label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link to="/" className="gap-3 py-3 font-semibold text-primary">
                                    <FiShoppingBag />
                                    Tienda
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <a
                        href={`${WEBSITE_URL}/`}
                        className="min-w-0 whitespace-nowrap text-base font-extrabold tracking-tight text-white sm:text-xl"
                    >
                        <span className="sm:hidden">Amir &amp; Cris</span>
                        <span className="hidden sm:inline">Servicios Amir y Cris</span>
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-1 px-1">
                        {websiteLinks.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="text-white hover:bg-white/15">
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/"
                                className="bg-white font-bold text-indigo-700 shadow-sm hover:bg-white/90"
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
                            <span className="hidden xl:inline">Administración</span>
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
