import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../services/orderServices'

const statusLabels = {
    pending: 'Pendiente',
    approved: 'Aprobada',
    rejected: 'Rechazada',
    cancelled: 'Cancelada',
    in_process: 'En proceso',
}

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getMyOrders()
                setOrders(data.orders || [])
            } catch {
                setError('No pudimos cargar tus órdenes. Intentá nuevamente.')
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [])

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold">Mis Órdenes</h1>
                <Link to="/" className="btn btn-outline">
                    Volver al Inicio
                </Link>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {!error && orders.length === 0 && (
                <div className="bg-base-200 rounded-lg p-10 text-center">
                    <p className="text-lg mb-4">Todavía no tenés órdenes.</p>
                    <Link to="/" className="btn btn-primary">
                        Ver productos
                    </Link>
                </div>
            )}

            <div className="space-y-5">
                {orders.map((order) => (
                    <article
                        key={order._id}
                        className="bg-base-100 border border-base-300 rounded-lg shadow p-5"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                            <div>
                                <p className="font-semibold">
                                    Orden #{order._id.slice(-8).toUpperCase()}
                                </p>
                                <p className="text-sm text-base-content/60">
                                    {new Date(order.createdAt).toLocaleString(
                                        'es-AR',
                                    )}
                                </p>
                            </div>
                            <span
                                className={`badge ${
                                    order.status === 'approved'
                                        ? 'badge-success'
                                        : 'badge-warning'
                                }`}
                            >
                                {statusLabels[order.status] || order.status}
                            </span>
                        </div>

                        <div className="divide-y divide-base-300">
                            {order.products.map((product) => (
                                <div
                                    key={`${order._id}-${product.productId}`}
                                    className="flex justify-between gap-4 py-3"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-base-content/60">
                                            Cantidad: {product.quantity}
                                        </p>
                                    </div>
                                    <p className="font-medium">
                                        ${product.price * product.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text-right font-bold text-lg pt-4">
                            Total: ${order.totalAmount}
                        </div>
                    </article>
                ))}
            </div>
        </main>
    )
}

export default MyOrders
