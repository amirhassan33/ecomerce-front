import { useState } from 'react'
import { CgTrash } from 'react-icons/cg'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ModalCart = () => {
    const navigate = useNavigate()
    const [showClearConfirmation, setShowClearConfirmation] = useState(false)
    const { userInfo } = useUser()
    const {
        cart,
        closeModal,
        isModalOpen,
        itemsQuantity,
        total,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
    } = useCart()

    if (!isModalOpen) return null // Solo renderizara si el modal está abierto

    return (
        <div className="modal modal-open px-4">
            <section className="modal-box w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Carrito de compras</h3>
                    <button
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        X
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner loading-lg"></span>
                        <p className="text-gray-500 mt-2">
                            Actualizando carrito...
                        </p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 max-h-96 flex flex-col gap-4 overflow-y-auto rounded">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center flex-wrap md:flex-row md:items-center gap-4 rounded-lg"
                                >
                                    <img
                                        className="w-20 h-20 object-cover aspect-square"
                                        src={item.imageUrl}
                                        alt={item.name}
                                    />
                                    <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                        <div>
                                            <h4 className="font-semibold">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {item.price}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                                            <div className="flex items-center rounded-lg">
                                                <button
                                                    onClick={async () => {
                                                        if (item.quantity > 1) {
                                                            await updateQuantity(
                                                                item._id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                    }}
                                                    disabled={
                                                        loading ||
                                                        item.quantity <= 1
                                                    }
                                                    className="p-2 border rounded"
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="px-4 py-2 font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={async () => {
                                                        await updateQuantity(
                                                            item._id,
                                                            item.quantity + 1,
                                                        )
                                                    }}
                                                    disabled={
                                                        loading ||
                                                        item.quantity >=
                                                            (item.stock || 999)
                                                    }
                                                    className="p-2 border rounded"
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>
                                            {/*Precio subtotal*/}
                                            <span className="font-semibold text-lg">
                                                ${item.price * item.quantity}
                                            </span>
                                            <button
                                                onClick={async () => {
                                                    await removeFromCart(
                                                        item._id,
                                                    )
                                                }}
                                                disabled={loading}
                                                className="btn btn-ghost btn-sm hover:bg-red-50"
                                            >
                                                <CgTrash size={19} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 mt-4 ">
                            <div className="flex justify-between items-center mb-2">
                                <span>Total de artículos:</span>
                                <span className="font-semibold">
                                    {itemsQuantity}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total:</span>
                                <span>${total}</span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                            <button
                                onClick={() => setShowClearConfirmation(true)}
                                disabled={loading}
                                className="btn btn-error w-full"
                                style={{ margin: 0 }}
                            >
                                Vaciar carrito
                            </button>
                            <button
                                type="button"
                                className="btn btn-info w-full"
                                style={{ margin: 0 }}
                                onClick={() => {
                                    closeModal()
                                    navigate('/')
                                }}
                            >
                                Seguir comprando
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary w-full"
                                style={{ margin: 0 }}
                                onClick={() => {
                                    closeModal()
                                    if (!userInfo?.id) {
                                        toast(
                                            'Iniciá sesión para continuar con la compra',
                                            { icon: '🔐' },
                                        )
                                    }
                                    navigate(
                                        userInfo?.id ? '/checkout' : '/login',
                                        {
                                            state: userInfo?.id
                                                ? undefined
                                                : { from: '/checkout' },
                                        },
                                    )
                                }}
                            >
                                {userInfo?.id
                                    ? 'Proceder al pago'
                                    : 'Iniciar sesión para pagar'}
                            </button>
                        </div>
                    </>
                )}
            </section>
            <div className="modal-backdrop" onClick={closeModal}></div>

            {showClearConfirmation && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
                    onClick={() => setShowClearConfirmation(false)}
                >
                    <section
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="clear-cart-title"
                        aria-describedby="clear-cart-description"
                        className="w-full max-w-md overflow-hidden rounded-3xl bg-base-100 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="h-2 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500"></div>
                        <div className="p-6 text-center sm:p-8">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <CgTrash size={32} aria-hidden="true" />
                            </div>
                            <h3
                                id="clear-cart-title"
                                className="text-2xl font-bold text-base-content"
                            >
                                ¿Vaciar el carrito?
                            </h3>
                            <p
                                id="clear-cart-description"
                                className="mx-auto mt-3 max-w-sm text-base-content/70"
                            >
                                Se eliminarán todos los productos que agregaste.
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                                <button
                                    type="button"
                                    className="btn border-base-300 bg-base-100 sm:min-w-36"
                                    onClick={() =>
                                        setShowClearConfirmation(false)
                                    }
                                    disabled={loading}
                                >
                                    Seguir comprando
                                </button>
                                <button
                                    type="button"
                                    className="btn border-0 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 sm:min-w-36"
                                    onClick={async () => {
                                        await clearCart()
                                        setShowClearConfirmation(false)
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <CgTrash size={19} aria-hidden="true" />
                                    )}
                                    Sí, vaciar
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}
export default ModalCart
