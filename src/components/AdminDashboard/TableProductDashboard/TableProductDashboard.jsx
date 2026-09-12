import { Link } from 'react-router-dom'
import { FiPackage, FiPlus } from 'react-icons/fi'
import { useProduct } from '../../../context/ProductContext'
import TableProducts from './TableProducts'

const TableProductDashboard = () => {
    const { products, productsLoading } = useProduct()

    return (
        <main className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <FiPackage className="text-xl text-primary" />
                        <h2 className="text-2xl font-bold sm:text-3xl">Productos</h2>
                    </div>
                    <p className="text-base-content/60">
                        {products.length} productos cargados en la tienda
                    </p>
                </div>
                <Link
                    to="/admin/dashboard/products/createProduct"
                    className="btn min-h-0 h-11 rounded-xl border-0 bg-primary px-5 text-primary-content shadow-sm hover:brightness-95"
                >
                    <FiPlus className="text-lg" />
                    Nuevo producto
                </Link>
            </div>

            <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                {productsLoading ? (
                    <div className="flex min-h-56 items-center justify-center">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <TableProducts products={products} />
                    </div>
                )}
            </section>
        </main>
    )
}

export default TableProductDashboard
