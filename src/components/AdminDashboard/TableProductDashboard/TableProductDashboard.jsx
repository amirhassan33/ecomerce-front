import { Link } from 'react-router-dom'
import { useProduct } from '../../../context/ProductContext'
import TableProducts from './TableProducts'

const TableProductDashboard = () => {
    const { products, productsLoading } = useProduct()

    return (
        <>
            <div className="flex items-center gap-4 justify-center">
                <h1>Admin productos</h1>
                <Link
                    to="/admin/dashboard/products/createProduct"
                    className="btn btn-primary"
                >
                    Crear producto
                </Link>
            </div>
            <div className="overflow-x-auto">
                {productsLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : (
                    <TableProducts products={products} />
                )}
            </div>
        </>
    )
}

export default TableProductDashboard
