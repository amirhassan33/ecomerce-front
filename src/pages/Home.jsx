import { useState } from 'react'
import {
    FiChevronLeft,
    FiChevronRight,
    FiFilter,
    FiSearch,
    FiX,
} from 'react-icons/fi'
import CardProduct from '../components/cardProduct/cardProduct'
import { useProduct } from '../context/ProductContext'

const PRODUCTS_PER_PAGE = 9

const Home = () => {
    const { products, productsLoading, error } = useProduct()
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [stockFilter, setStockFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('default')
    const [showFilters, setShowFilters] = useState(false)

    const normalizeText = (text) =>
        text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

    const normalizedSearch = normalizeText(search.trim())
    const filteredProducts = products
        .filter((product) => {
            const price = Number(product.price) || 0
            const stock = Number(product.stock) || 0
            const matchesName = normalizeText(product.name || '').includes(
                normalizedSearch,
            )
            const matchesMinPrice = minPrice === '' || price >= Number(minPrice)
            const matchesMaxPrice = maxPrice === '' || price <= Number(maxPrice)
            const matchesStock =
                stockFilter === 'all' ||
                (stockFilter === 'available' && stock > 0) ||
                (stockFilter === 'unavailable' && stock === 0)

            return (
                matchesName &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesStock
            )
        })
        .sort((firstProduct, secondProduct) => {
            if (sortOrder === 'price-asc') {
                return Number(firstProduct.price) - Number(secondProduct.price)
            }
            if (sortOrder === 'price-desc') {
                return Number(secondProduct.price) - Number(firstProduct.price)
            }
            if (sortOrder === 'name') {
                return (firstProduct.name || '').localeCompare(
                    secondProduct.name || '',
                    'es',
                )
            }
            return 0
        })
    const hasActiveFilters =
        search.trim() ||
        minPrice !== '' ||
        maxPrice !== '' ||
        stockFilter !== 'all' ||
        sortOrder !== 'default'
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

    const clearFilters = () => {
        setSearch('')
        setMinPrice('')
        setMaxPrice('')
        setStockFilter('all')
        setSortOrder('default')
        setCurrentPage(1)
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-7 mb-2 text-purple-700 uppercase">
                Tienda Online
            </h1>
            <p className="text-center mb-5">
                Encontrá el producto ideal para vos
            </p>

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

                {hasActiveFilters && !productsLoading && !error && (
                    <p className="mt-2 px-1 text-sm text-base-content/60">
                        {filteredProducts.length === 1
                            ? '1 producto encontrado'
                            : `${filteredProducts.length} productos encontrados`}
                    </p>
                )}
            </div>

            <button
                type="button"
                className="btn btn-outline mb-4 w-full gap-2 lg:hidden"
                onClick={() => setShowFilters((current) => !current)}
                aria-expanded={showFilters}
                aria-controls="panel-filtros"
            >
                <FiFilter aria-hidden="true" />
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>

            <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                <aside
                    id="panel-filtros"
                    className={`${showFilters ? 'block' : 'hidden'} rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm lg:sticky lg:top-4 lg:block`}
                >
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-bold">
                            <FiFilter aria-hidden="true" />
                            Filtros
                        </h2>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                className="btn btn-ghost btn-xs text-primary"
                                onClick={clearFilters}
                            >
                                Limpiar
                            </button>
                        )}
                    </div>

                    <div className="space-y-5">
                        <fieldset>
                            <legend className="mb-2 font-semibold">
                                Precio
                            </legend>
                            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                                <input
                                    type="number"
                                    min="0"
                                    value={minPrice}
                                    onChange={(event) => {
                                        setMinPrice(event.target.value)
                                        setCurrentPage(1)
                                    }}
                                    className="input input-bordered w-full"
                                    placeholder="Mínimo"
                                    aria-label="Precio mínimo"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    value={maxPrice}
                                    onChange={(event) => {
                                        setMaxPrice(event.target.value)
                                        setCurrentPage(1)
                                    }}
                                    className="input input-bordered w-full"
                                    placeholder="Máximo"
                                    aria-label="Precio máximo"
                                />
                            </div>
                        </fieldset>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-semibold">
                                Disponibilidad
                            </span>
                            <select
                                className="select select-bordered w-full"
                                value={stockFilter}
                                onChange={(event) => {
                                    setStockFilter(event.target.value)
                                    setCurrentPage(1)
                                }}
                            >
                                <option value="all">Todos</option>
                                <option value="available">Con stock</option>
                                <option value="unavailable">Sin stock</option>
                            </select>
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-semibold">
                                Ordenar por
                            </span>
                            <select
                                className="select select-bordered w-full"
                                value={sortOrder}
                                onChange={(event) => {
                                    setSortOrder(event.target.value)
                                    setCurrentPage(1)
                                }}
                            >
                                <option value="default">Más recientes</option>
                                <option value="price-asc">Menor precio</option>
                                <option value="price-desc">Mayor precio</option>
                                <option value="name">Nombre A-Z</option>
                            </select>
                        </label>
                    </div>
                </aside>

                <section>
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
                                    Probá cambiando o limpiando los filtros.
                                </p>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="btn btn-outline btn-sm mt-5"
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        ) : (
                            visibleProducts.map((product) => (
                                <CardProduct
                                    key={product._id}
                                    product={product}
                                />
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
                                <span className="hidden sm:inline">
                                    Anterior
                                </span>
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
                                            page === activePage
                                                ? 'page'
                                                : undefined
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
                                <span className="hidden sm:inline">
                                    Siguiente
                                </span>
                                <FiChevronRight aria-hidden="true" />
                            </button>
                        </nav>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Home
