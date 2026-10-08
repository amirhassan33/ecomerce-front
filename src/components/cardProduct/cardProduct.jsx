import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const CardProduct = ({
    product: { _id, name, price, imageUrl, description, stock },
}) => {
    const { addToCart, loading, openModal } = useCart()

    const handleAddToCart = async () => {
        await addToCart({ _id, name, price, imageUrl, description, stock })
        openModal()
    }

    const hasStock = Number(stock) > 0

    return (
        <article className="card h-full w-full overflow-hidden border border-base-200 bg-base-100 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <figure className="relative aspect-square overflow-hidden bg-base-200">
                <img
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    src={imageUrl}
                    alt={name}
                    loading="lazy"
                />
                {hasStock ? (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-success shadow-sm">
                        En stock
                    </span>
                ) : (
                    <span className="absolute left-3 top-3 rounded-full bg-base-100/95 px-3 py-1 text-xs font-bold text-error shadow-sm">
                        Sin stock
                    </span>
                )}
            </figure>

            <div className="card-body gap-3 p-5">
                <div>
                    <h2 className="line-clamp-2 min-h-[3.5rem] text-lg font-extrabold leading-tight">{name}</h2>
                    <p className="mt-2 text-xl font-black text-primary">
                        ${Number(price).toLocaleString('es-AR')}
                    </p>
                </div>

                <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-base-content/60">
                    {description}
                </p>

                <div className="card-actions mt-auto grid grid-cols-2 gap-2 pt-2">
                    <Link
                        to={`/detailProduct/${_id}`}
                        className="btn btn-outline btn-sm w-full"
                    >
                        Ver detalles
                    </Link>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={loading || !hasStock}
                        className="btn btn-primary btn-sm w-full"
                    >
                        <FaShoppingCart size={14} />
                        {hasStock ? 'Agregar' : 'Sin stock'}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default CardProduct
