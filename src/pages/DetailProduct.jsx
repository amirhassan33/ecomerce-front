import { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()
    const { addToCart, openModal } = useCart()
    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])
    const handleAddToCart = async () => {
        await addToCart(product)
        openModal()
    }
    return (
        <>
            {productLoading ? (
                <div className="loading loading-spinner"></div>
            ) : (
                <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-xl bg-gray-100 md:h-[520px]">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <section className="flex flex-col gap-5 pt-2 md:pt-0 md:pl-0 md:w-1/2">
                        <h1 className="break-words text-3xl font-bold md:text-5xl">
                            {product.name}
                        </h1>
                        <p className="text-xl badge badge-warning p-4 font-bold">
                            {product.price}
                        </p>
                        <p className="text-lg">{product.description}</p>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-success mt-2 md:mt-auto md:btn-lg"
                        >
                            Agregar al carrito
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default DetailProduct
