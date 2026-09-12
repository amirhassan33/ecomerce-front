import { NavLink, Outlet } from 'react-router-dom'
import { FiClipboard, FiPackage, FiShield } from 'react-icons/fi'

const getTabClasses = ({ isActive }) =>
    `flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition sm:min-w-36 ${
        isActive
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-base-content/70 hover:bg-base-100 hover:text-base-content'
    }`

const DashboardLayout = () => {
    return (
        <>
            <section className="mx-auto mt-8 max-w-6xl px-4">
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-6">
                    <div className="mb-4 flex items-center gap-3 sm:mb-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                            <FiShield className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold sm:text-2xl">
                                Panel de administración
                            </h1>
                            <p className="text-sm text-base-content/60">
                                Gestioná tu tienda desde un solo lugar
                            </p>
                        </div>
                    </div>

                    <nav
                        className="grid grid-cols-2 gap-1 rounded-xl bg-base-200 p-1"
                        aria-label="Secciones de administración"
                    >
                        <NavLink className={getTabClasses} to="/admin/dashboard/products">
                            <FiPackage />
                            Productos
                        </NavLink>
                        <NavLink className={getTabClasses} to="/admin/dashboard/orders">
                            <FiClipboard />
                            Pedidos
                        </NavLink>
                    </nav>
                </div>
            </section>
            <Outlet />
        </>
    )
}

export default DashboardLayout
