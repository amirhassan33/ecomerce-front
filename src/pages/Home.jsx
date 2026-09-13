import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiSearch, FiX } from 'react-icons/fi'
import CardProduct from '../components/cardProduct/cardProduct'
import { useProduct } from '../context/ProductContext'

const PRODUCTS_PER_PAGE = 10

const Home = () => {
    const { products, productsLoading, error } = useProduct()
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const normalizeText = (text) =>
        text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

    const normalizedSearch = normalizeText(search.trim())
    const filteredProducts = products.filter((product) =>
        normalizeText(product.name || '').includes(normalizedSearch),
    )
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    const activePage = Math.min(currentPage, totalPages || 1)
    const firstProductIndex = (activePage - 1) * PRODUCTS_PER_PAGE
    const visibleProducts = filteredProducts.slice(
        firstProductIndex,
        firstProductIndex + PRODUCTS_PER_PAGE,
    )

    const changePage = (page) => {
        setCurrentPage(page)
        document
            .getElementById('productos')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-7 mb-2 text-purple-700 uppercase">
                Mi Ecomers
            </h1>
            <p className="text-center mb-5">Elegí tu producto</p>

            <div className="mx-auto mb-8 max-w-xl px-4">
                <div className="input input-bordered flex h-12 items-center gap-3 rounded-xl bg-base-100 shadow-sm focus-within:border-primary focus-within:outline-none">
                    <FiSearch
                        className="h-5 w-5 shrink-0 text-base-content/50"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Buscar productos por nombre..."
                        className="grow"
                        aria-label="Buscar productos por nombre"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('')
                                setCurrentPage(1)
                            }}
                            className="btn btn-circle btn-ghost btn-sm"
                            aria-label="Limpiar búsqueda"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {search.trim() && !productsLoading && !error && (
                    <p className="mt-2 px-1 text-sm text-base-content/60">
                        {filteredProducts.length === 1
                            ? '1 producto encontrado'
                            : `${filteredProducts.length} productos encontrados`}
                    </p>
                )}
            </div>

            <div
                id="productos"
                className="scroll-mt-28 flex flex-wrap justify-center gap-5"
            >
                {productsLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : error ? (
                    <p>Error al cargar los productos</p>
                ) : filteredProducts.length === 0 ? (
                    <div className="mx-4 w-full max-w-xl rounded-2xl border border-base-300 bg-base-100 p-10 text-center shadow-sm">
                        <FiSearch className="mx-auto mb-3 h-9 w-9 text-base-content/30" />
                        <h2 className="text-lg font-bold">
                            No encontramos productos
                        </h2>
                        <p className="mt-1 text-base-content/60">
                            Probá escribiendo otro nombre.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('')
                                setCurrentPage(1)
                            }}
                            className="btn btn-outline btn-sm mt-5"
                        >
                            Ver todos los productos
                        </button>
                    </div>
                ) : (
                    visibleProducts.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))
                )}
            </div>

            {!productsLoading && !error && totalPages > 1 && (
                <nav
                    className="my-10 flex flex-wrap items-center justify-center gap-2 px-4"
                    aria-label="Paginación de productos"
                >
                    <button
                        type="button"
                        className="btn btn-outline btn-sm sm:btn-md"
                        onClick={() => changePage(activePage - 1)}
                        disabled={activePage === 1}
                        aria-label="Ir a la página anterior"
                    >
                        <FiChevronLeft aria-hidden="true" />
                        <span className="hidden sm:inline">Anterior</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1

                        return (
                            <button
                                key={page}
                                type="button"
                                className={`btn btn-square btn-sm sm:btn-md ${
                                    page === activePage
                                        ? 'btn-primary'
                                        : 'btn-outline'
                                }`}
                                onClick={() => changePage(page)}
                                aria-label={`Ir a la página ${page}`}
                                aria-current={
                                    page === activePage ? 'page' : undefined
                                }
                            >
                                {page}
                            </button>
                        )
                    })}

                    <button
                        type="button"
                        className="btn btn-outline btn-sm sm:btn-md"
                        onClick={() => changePage(activePage + 1)}
                        disabled={activePage === totalPages}
                        aria-label="Ir a la página siguiente"
                    >
                        <span className="hidden sm:inline">Siguiente</span>
                        <FiChevronRight aria-hidden="true" />
                    </button>
                </nav>
            )}
        </div>
    )
}

export default Home
