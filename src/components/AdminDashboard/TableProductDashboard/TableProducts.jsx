import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useProduct } from '../../../context/ProductContext'
import toast from 'react-hot-toast'

const TableProducts = ({ products }) => {
    const { deleteProduct } = useProduct()

    const onHandleDelete = async (id) => {
        const result = await deleteProduct(id)
        if (result.success) toast.success(result.message)
        else toast.error(result.message)
    }

    return (
        <table className="table">
            <thead className="bg-base-200/70 text-sm text-base-content/70">
                <tr>
                    <th>Producto</th>
                    <th className="hidden lg:table-cell">Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-right">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id} className="hover:bg-base-200/40">
                        <td>
                            <div className="flex min-w-48 items-center gap-3">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-12 w-12 rounded-lg border border-base-300 bg-base-200 object-cover"
                                />
                                <span className="font-semibold">{product.name}</span>
                            </div>
                        </td>
                        <td className="hidden max-w-xs truncate lg:table-cell">
                            {product.description}
                        </td>
                        <td className="font-medium">${product.price}</td>
                        <td>
                            <span className={`badge badge-outline ${product.stock > 0 ? 'badge-success' : 'badge-error'}`}>
                                {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                            </span>
                        </td>
                        <td>
                            <div className="flex justify-end gap-2">
                                <Link
                                    to={`/admin/dashboard/products/updateProduct/${product._id}`}
                                    className="btn btn-square btn-sm border-base-300 bg-base-100"
                                    aria-label={`Editar ${product.name}`}
                                    title="Editar producto"
                                >
                                    <FiEdit2 />
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-square btn-sm border-error/20 bg-error/10 text-error hover:border-error hover:bg-error hover:text-error-content"
                                    onClick={() => onHandleDelete(product._id)}
                                    aria-label={`Eliminar ${product.name}`}
                                    title="Eliminar producto"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableProducts
