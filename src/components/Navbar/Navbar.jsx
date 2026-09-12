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
            <nav className="navbar min-h-16 rounded-2xl border border-base-300 bg-base-100 px-3 shadow-sm lg:px-5">
                <div className="navbar-start gap-2">
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-circle btn-ghost"
                            aria-label="Abrir menú de navegación"
                        >
                            <FiMenu className="h-6 w-6" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-50 mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
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
                        className="whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-xl"
                    >
                        Amir <span className="text-primary">&amp;</span> Cris
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-1 px-1">
                        {websiteLinks.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href}>{label}</a>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/"
                                className="bg-primary/10 font-bold text-primary hover:bg-primary/15"
                            >
                                Tienda
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <AuthButtons />
                    {userInfo?.isAdmin && (
                        <Link
                            className="btn h-11 min-h-0 rounded-full border-0 bg-slate-900 px-3 text-white shadow-sm hover:bg-slate-700 sm:px-4"
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
