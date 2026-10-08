import { useState } from 'react'
import { CgTrash } from 'react-icons/cg'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FiArrowRight, FiShoppingBag, FiShield, FiTruck, FiX } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { storeConfig } from '../../config/storeConfig'

const formatPrice = (value) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(Number(value) || 0)

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

    if (!isModalOpen) return null

    const handleCheckout = () => {
        closeModal()
        if (!userInfo?.id) {
            toast('Iniciá sesión para continuar con la compra', { icon: '🔐' })
        }
        navigate(userInfo?.id ? '/checkout' : '/login', {
            state: userInfo?.id ? undefined : { from: '/checkout' },
        })
    }

    return (
        <div className="modal modal-open z-[100] bg-slate-950/60 px-2 backdrop-blur-sm sm:px-4">
            <section className="modal-box max-h-[calc(100vh-1rem)] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#fffdfb] p-0 shadow-2xl">
                <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 sm:px-7">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-700">
                            Tu selección
                        </p>
                        <h2 className="mt-1 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
                            Carrito de compras
                        </h2>
                    </div>
                    <button
                        onClick={closeModal}
                        className="btn btn-circle btn-ghost"
                        aria-label="Cerrar carrito"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
                        <span className="loading loading-spinner loading-lg text-rose-700" />
                        <p className="mt-4 font-medium text-stone-700">Actualizando tu carrito...</p>
                        <p className="mt-1 text-sm text-stone-500">Un momento, por favor.</p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="px-6 py-14 text-center sm:px-10">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-700">
                            <FiShoppingBag className="h-9 w-9" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-stone-900">Tu carrito está vacío</h3>
                        <p className="mx-auto mt-2 max-w-md text-stone-500">
                            Todavía no agregaste productos. Descubrí nuestra colección y encontrá tu próximo favorito.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                closeModal()
                                navigate('/')
                            }}
                            className="btn mt-7 border-0 bg-stone-900 px-7 text-white hover:bg-stone-800"
                        >
                            Ver productos
                            <FiArrowRight />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px]">
                        <div className="max-h-[58vh] overflow-y-auto px-5 py-5 sm:px-7">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <p className="text-sm text-stone-500">
                                    {itemsQuantity} {itemsQuantity === 1 ? 'producto' : 'productos'} en tu carrito
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowClearConfirmation(true)}
                                    disabled={loading}
                                    className="text-sm font-semibold text-red-500 transition hover:text-red-700 disabled:opacity-50"
                                >
                                    Vaciar carrito
                                </button>
                            </div>

                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <article
                                        key={item._id}
                                        className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4"
                                    >
                                        <div className="flex gap-3 sm:gap-4">
                                            <img
                                                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                                                src={item.imageUrl}
                                                alt={item.name}
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="truncate font-bold text-stone-900">{item.name}</p>
                                                        <p className="mt-1 text-sm text-stone-500">
                                                            {formatPrice(item.price)} c/u
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        disabled={loading}
                                                        className="btn btn-circle btn-ghost btn-sm shrink-0 text-stone-400 hover:bg-red-50 hover:text-red-500"
                                                        aria-label={`Eliminar ${item.name}`}
                                                    >
                                                        <CgTrash size={18} />
                                                    </button>
                                                </div>

                                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                                    <div className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                                                        <button
                                                            onClick={() => item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)}
                                                            disabled={loading || item.quantity <= 1}
                                                            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                                                            aria-label="Reducir cantidad"
                                                        >
                                                            <FaMinus size={11} />
                                                        </button>
                                                        <span className="min-w-9 text-center text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            disabled={loading || item.quantity >= (item.stock || 999)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                                                            aria-label="Aumentar cantidad"
                                                        >
                                                            <FaPlus size={11} />
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-black text-stone-900">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <aside className="border-t border-stone-200 bg-stone-50/80 px-5 py-5 sm:px-7 lg:border-l lg:border-t-0">
                            <div className="lg:sticky lg:top-0">
                                <h3 className="text-lg font-bold text-stone-900">Resumen del pedido</h3>

                                <div className="mt-5 space-y-3 text-sm">
                                    <div className="flex justify-between gap-4 text-stone-600">
                                        <span>Productos</span>
                                        <span>{itemsQuantity}</span>
                                    </div>
                                    <div className="flex justify-between gap-4 text-stone-600">
                                        <span>Envío</span>
                                        <span className="font-semibold text-emerald-600">A coordinar</span>
                                    </div>
                                </div>

                                <div className="my-5 border-t border-stone-200" />

                                <div className="flex items-end justify-between gap-4">
                                    <span className="font-semibold text-stone-700">Total</span>
                                    <span className="text-2xl font-black text-stone-900">{formatPrice(total)}</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCheckout}
                                    className="btn mt-6 w-full border-0 bg-stone-900 text-white shadow-lg hover:bg-stone-800"
                                >
                                    {userInfo?.id ? 'Continuar al checkout' : 'Iniciar sesión y comprar'}
                                    <FiArrowRight />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        closeModal()
                                        navigate('/')
                                    }}
                                    className="btn btn-ghost mt-2 w-full text-stone-600"
                                >
                                    Seguir comprando
                                </button>

                                <div className="mt-6 space-y-3 rounded-2xl bg-white p-4 text-xs text-stone-600 shadow-sm">
                                    <div className="flex gap-3">
                                        <FiShield className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                                        <span>Compra segura y pago protegido con Mercado Pago.</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <FiTruck className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                                        <span>Coordinamos la entrega de tu pedido.</span>
                                    </div>
                                </div>

                                <p className="mt-5 text-center text-[11px] leading-5 text-stone-400">
                                    {storeConfig.name} · Gracias por elegirnos.
                                </p>
                            </div>
                        </aside>
                    </div>
                )}
            </section>

            <div className="modal-backdrop" onClick={closeModal} />

            {showClearConfirmation && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
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
                        <div className="h-2 bg-gradient-to-r from-amber-700 via-rose-600 to-stone-800" />
                        <div className="p-6 text-center sm:p-8">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <CgTrash size={32} aria-hidden="true" />
                            </div>
                            <h3 id="clear-cart-title" className="text-2xl font-bold text-base-content">
                                ¿Vaciar el carrito?
                            </h3>
                            <p id="clear-cart-description" className="mx-auto mt-3 max-w-sm text-base-content/70">
                                Se eliminarán todos los productos que agregaste. Esta acción no se puede deshacer.
                            </p>
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                                <button
                                    type="button"
                                    className="btn border-base-300 bg-base-100 sm:min-w-36"
                                    onClick={() => setShowClearConfirmation(false)}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn border-0 bg-red-500 text-white hover:bg-red-600 sm:min-w-36"
                                    onClick={async () => {
                                        await clearCart()
                                        setShowClearConfirmation(false)
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm" />
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
