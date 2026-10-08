import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaCheck, FaShieldAlt, FaShoppingCart, FaTruck } from 'react-icons/fa'
import { useProduct } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import CardProduct from '../components/cardProduct/cardProduct'
import { storeConfig } from '../config/storeConfig'

const formatPrice = (price) =>
    `$${Number(price || 0).toLocaleString('es-AR')}`

const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, products, productLoading, error } = useProduct()
    const { addToCart, openModal, loading: cartLoading } = useCart()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        getProductById(id)
        setQuantity(1)
    }, [id, getProductById])

    const stock = Number(product?.stock || 0)
    const hasStock = stock > 0

    const relatedProducts = useMemo(
        () =>
            products
                .filter((item) => item._id !== id && Number(item.stock) > 0)
                .slice(0, 3),
        [products, id],
    )

    const handleAddToCart = async () => {
        if (!product?._id || !hasStock) return
        await addToCart(product, quantity)
        openModal()
    }

    if (productLoading) {
        return (
            <div className="space-y-8 py-8">
                <div className="h-5 w-40 animate-pulse rounded bg-base-300" />
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="aspect-square animate-pulse rounded-[2rem] bg-base-200" />
                    <div className="space-y-5 py-4">
                        <div className="h-10 w-3/4 animate-pulse rounded bg-base-300" />
                        <div className="h-8 w-32 animate-pulse rounded bg-base-300" />
                        <div className="h-24 w-full animate-pulse rounded bg-base-200" />
                        <div className="h-14 w-full animate-pulse rounded bg-base-300" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !product?._id) {
        return (
            <section className="mx-auto max-w-2xl py-20 text-center">
                <div className="rounded-[2rem] border border-error/20 bg-error/5 p-10">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-error">
                        Producto no disponible
                    </p>
                    <h1 className="mt-3 text-3xl font-black">No pudimos encontrar este producto.</h1>
                    <p className="mt-3 text-base-content/60">
                        Puede que haya sido eliminado o que el enlace ya no sea válido.
                    </p>
                    <Link to="/" className="btn btn-primary mt-7">
                        Volver a la tienda
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <div className="pb-16 pt-5 sm:pt-8">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-base-content/60 transition hover:text-primary"
            >
                <FaArrowLeft /> Volver a la tienda
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
                <div className="overflow-hidden rounded-[2rem] border border-base-200 bg-white p-3 shadow-sm">
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-amber-50 via-white to-rose-50">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-contain p-6 transition duration-500 hover:scale-[1.03] sm:p-10"
                        />
                        <span
                            className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-extrabold shadow-sm ${
                                hasStock
                                    ? 'bg-white text-success'
                                    : 'bg-white text-error'
                            }`}
                        >
                            {hasStock ? '✓ En stock' : 'Sin stock'}
                        </span>
                    </div>
                </div>

                <section className="flex flex-col lg:sticky lg:top-6">
                    <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-primary">
                        {storeConfig.category}
                    </p>
                    <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        {product.name}
                    </h1>

                    <div className="mt-5 flex items-end gap-3">
                        <p className="text-3xl font-black text-primary sm:text-4xl">
                            {formatPrice(product.price)}
                        </p>
                        {hasStock && (
                            <span className="mb-1 text-sm font-semibold text-success">
                                Disponible ahora
                            </span>
                        )}
                    </div>

                    <div className="my-7 h-px bg-base-200" />

                    <p className="text-base leading-7 text-base-content/70 sm:text-lg">
                        {product.description}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-base-200 bg-white p-4">
                            <FaTruck className="text-primary" />
                            <p className="mt-2 text-sm font-bold">Envíos</p>
                            <p className="mt-1 text-xs leading-5 text-base-content/55">Coordinamos la entrega de tu pedido.</p>
                        </div>
                        <div className="rounded-2xl border border-base-200 bg-white p-4">
                            <FaShieldAlt className="text-primary" />
                            <p className="mt-2 text-sm font-bold">Compra segura</p>
                            <p className="mt-1 text-xs leading-5 text-base-content/55">Pagá de forma segura con Mercado Pago.</p>
                        </div>
                        <div className="rounded-2xl border border-base-200 bg-white p-4">
                            <FaCheck className="text-primary" />
                            <p className="mt-2 text-sm font-bold">Compra simple</p>
                            <p className="mt-1 text-xs leading-5 text-base-content/55">Elegí, agregá al carrito y listo.</p>
                        </div>
                    </div>

                    {hasStock && (
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="flex h-14 w-fit items-center overflow-hidden rounded-2xl border border-base-300 bg-white">
                                <button
                                    type="button"
                                    className="h-full w-12 text-xl font-bold transition hover:bg-base-200"
                                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                    aria-label="Disminuir cantidad"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-black">{quantity}</span>
                                <button
                                    type="button"
                                    className="h-full w-12 text-xl font-bold transition hover:bg-base-200"
                                    onClick={() => setQuantity((value) => Math.min(stock, value + 1))}
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={cartLoading}
                                className="btn btn-primary h-14 flex-1 rounded-2xl text-base font-extrabold shadow-lg shadow-primary/20 sm:text-lg"
                            >
                                <FaShoppingCart />
                                {cartLoading ? 'Agregando...' : 'Agregar al carrito'}
                            </button>
                        </div>
                    )}

                    {!hasStock && (
                        <div className="mt-7 rounded-2xl border border-error/20 bg-error/5 p-5 text-sm font-semibold text-error">
                            Este producto está sin stock por el momento.
                        </div>
                    )}

                    <p className="mt-4 text-center text-xs text-base-content/50 sm:text-left">
                        {storeConfig.tagline}
                    </p>
                </section>
            </div>

            {relatedProducts.length > 0 && (
                <section className="mt-20 border-t border-base-200 pt-12">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-primary">También puede gustarte</p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight">Descubrí otros productos</h2>
                        </div>
                        <Link to="/" className="font-bold text-primary hover:underline">Ver toda la colección →</Link>
                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedProducts.map((item) => (
                            <CardProduct key={item._id} product={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default DetailProduct
