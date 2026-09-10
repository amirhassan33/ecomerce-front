import { useEffect, useState } from 'react'
import { getAllOrders } from '../services/orderServices'

const statusLabels = {
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    cancelled: 'Cancelado',
    in_process: 'En proceso',
}

const statusClasses = {
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-error',
    cancelled: 'badge-neutral',
    in_process: 'badge-info',
}

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await getAllOrders()
                setOrders(response.orders || [])
            } catch {
                setError('No se pudieron cargar los pedidos.')
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [])

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Pedidos</h1>
                <p className="text-base-content/60 mt-1">
                    Compras y datos de envío de tus clientes
                </p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {!error && orders.length === 0 && (
                <div className="bg-base-200 rounded-lg p-10 text-center">
                    Todavía no hay pedidos.
                </div>
            )}

            <div className="space-y-6">
                {orders.map((order) => {
                    const shipping = order.shippingInfo
                    const address = shipping?.address

                    return (
                        <article
                            key={order._id}
                            className="bg-base-100 border border-base-300 rounded-lg shadow p-5"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-base-300">
                                <div>
                                    <h2 className="font-bold">
                                        Pedido #{order._id.slice(-8).toUpperCase()}
                                    </h2>
                                    <p className="text-sm text-base-content/60">
                                        {new Date(order.createdAt).toLocaleString(
                                            'es-AR',
                                        )}
                                    </p>
                                </div>
                                <span
                                    className={`badge ${
                                        statusClasses[order.status] ||
                                        'badge-neutral'
                                    }`}
                                >
                                    {statusLabels[order.status] || order.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-5">
                                <section>
                                    <h3 className="font-bold mb-3">Cliente</h3>
                                    <div className="space-y-1 text-sm">
                                        <p>
                                            {shipping?.firstName}{' '}
                                            {shipping?.lastName}
                                        </p>
                                        <p>{shipping?.email}</p>
                                        <p>{shipping?.phone}</p>
                                    </div>

                                    <h3 className="font-bold mt-5 mb-3">
                                        Dirección de envío
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <p>
                                            {address?.street} {address?.number}
                                        </p>
                                        <p>
                                            {address?.city}, {address?.state}
                                        </p>
                                        <p>Código postal: {address?.zipCode}</p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold mb-3">
                                        Productos
                                    </h3>
                                    <div className="divide-y divide-base-300">
                                        {order.products.map((product) => (
                                            <div
                                                key={`${order._id}-${product.productId}`}
                                                className="flex justify-between gap-4 py-2 text-sm"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-base-content/60">
                                                        Cantidad:{' '}
                                                        {product.quantity}
                                                    </p>
                                                </div>
                                                <p>
                                                    $
                                                    {product.price *
                                                        product.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="font-bold text-right text-lg mt-4">
                                        Total: ${order.totalAmount}
                                    </p>
                                </section>
                            </div>
                        </article>
                    )
                })}
            </div>
        </main>
    )
}

export default AdminOrders
