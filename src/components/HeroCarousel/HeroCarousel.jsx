import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { storeConfig } from '../../config/storeConfig'
import './HeroCarousel.css'

const slides = [
    {
        eyebrow: 'Velas & aromas',
        title: 'Tu espacio.',
        accent: 'Tu momento.',
        text: 'Encendé una pausa. Descubrí velas y aromas que invitan a bajar el ritmo y disfrutar de estar en casa.',
        cta: 'Explorar la colección',
        note: 'Un pequeño ritual, todos los días.',
        theme: 'warm',
    },
    {
        eyebrow: 'El placer de estar en casa',
        title: 'Un aroma.',
        accent: 'Mil sensaciones.',
        text: 'Dale una nueva calidez a ese rincón favorito. Encontrá el aroma que mejor acompañe tus momentos.',
        cta: 'Encontrar mi aroma',
        note: 'Hacé lugar para lo que te hace bien.',
        theme: 'olive',
    },
    {
        eyebrow: 'Detalles con intención',
        title: 'Para vos.',
        accent: 'Para regalar.',
        text: 'Hay detalles que dicen mucho. Elegí un aroma para disfrutar o regalar un momento de calma.',
        cta: 'Descubrir los productos',
        note: 'Los mejores detalles se sienten.',
        theme: 'rose',
    },
]

export default function HeroCarousel({ products = [], onViewProducts }) {
    const [active, setActive] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
    const [failed, setFailed] = useState({})
    const touchStart = useRef(null)
    const slide = slides[active]
    const candidates = products
        .filter((p) => p.imageUrl && Number(p.stock) > 0 && !failed[p.imageUrl])
        .slice(0, 3)
    const product = candidates.length
        ? candidates[active % candidates.length]
        : null
    const rotating = !hovered && !focused && !hidden && !reducedMotion

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => setReducedMotion(query.matches)
        const visibility = () => setHidden(document.hidden)
        query.addEventListener('change', update)
        document.addEventListener('visibilitychange', visibility)
        return () => {
            query.removeEventListener('change', update)
            document.removeEventListener('visibilitychange', visibility)
        }
    }, [])

    useEffect(() => {
        if (!rotating) return
        const timer = window.setTimeout(
            () => setActive((i) => (i + 1) % slides.length),
            5000,
        )
        return () => window.clearTimeout(timer)
    }, [rotating, active])

    const select = (index) => setActive((index + slides.length) % slides.length)

    return (
        <section
            className={`lumina-hero lumina-hero--${slide.theme}`}
            aria-label="Colección Lúmina"
            aria-roledescription="carrusel"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                    setFocused(false)
            }}
            onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault()
                    select(active + (e.key === 'ArrowLeft' ? -1 : 1))
                }
            }}
        >
            <div className="lumina-hero__top">
                <span>
                    {storeConfig.name} <span aria-hidden="true">/</span>{' '}
                    {storeConfig.category}
                </span>
                <span className="lumina-hero__edition">
                    El arte de disfrutar lo simple
                </span>
            </div>
            <div
                className="lumina-hero__body"
                onTouchStart={(e) => {
                    const t = e.touches[0]
                    touchStart.current = { x: t.clientX, y: t.clientY }
                }}
                onTouchCancel={() => {
                    touchStart.current = null
                }}
                onTouchEnd={(e) => {
                    const start = touchStart.current
                    touchStart.current = null
                    if (!start) return
                    const t = e.changedTouches[0],
                        dx = t.clientX - start.x,
                        dy = t.clientY - start.y
                    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
                        select(active + (dx < 0 ? 1 : -1))
                }}
            >
                <div
                    className="lumina-hero__copy"
                    aria-live={rotating ? 'off' : 'polite'}
                    aria-atomic="true"
                >
                    <div
                        key={active}
                        className="lumina-hero__entrance"
                        role="group"
                        aria-roledescription="diapositiva"
                        aria-label={`${active + 1} de ${slides.length}`}
                    >
                        <p className="lumina-hero__eyebrow">
                            <span aria-hidden="true" />
                            {slide.eyebrow}
                        </p>
                        <h1>
                            {slide.title}
                            <em>{slide.accent}</em>
                        </h1>
                        <p className="lumina-hero__description">{slide.text}</p>
                        <button
                            type="button"
                            className="lumina-hero__cta"
                            onClick={onViewProducts}
                        >
                            {slide.cta}
                            <FiArrowUpRight aria-hidden="true" />
                        </button>
                        <p className="lumina-hero__note">{slide.note}</p>
                    </div>
                </div>
                <div className="lumina-hero__visual">
                    <span className="lumina-hero__orbit" aria-hidden="true" />
                    <span className="lumina-hero__visual-label">
                        La calma empieza acá
                    </span>
                    <div className="lumina-hero__stage">
                        {product ? (
                            <img
                                key={product.imageUrl}
                                src={product.imageUrl}
                                alt={product.name || 'Producto de la colección'}
                                fetchPriority="high"
                                decoding="async"
                                onError={() =>
                                    setFailed((old) => ({
                                        ...old,
                                        [product.imageUrl]: true,
                                    }))
                                }
                            />
                        ) : (
                            <svg
                                className="lumina-hero__candle"
                                viewBox="0 0 360 360"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient
                                        id="lumina-glass"
                                        x2="1"
                                        y2="0"
                                    >
                                        <stop stopColor="#b17d4c" />
                                        <stop
                                            offset=".45"
                                            stopColor="#e8c9a0"
                                        />
                                        <stop offset="1" stopColor="#a96e42" />
                                    </linearGradient>
                                </defs>
                                <ellipse
                                    cx="180"
                                    cy="316"
                                    rx="125"
                                    ry="15"
                                    fill="#503221"
                                    opacity=".12"
                                />
                                <path
                                    d="M90 139h180l-12 151q-78 40-156 0Z"
                                    fill="url(#lumina-glass)"
                                />
                                <ellipse
                                    cx="180"
                                    cy="139"
                                    rx="90"
                                    ry="25"
                                    fill="#f4e4c8"
                                />
                                <ellipse
                                    cx="180"
                                    cy="139"
                                    rx="79"
                                    ry="19"
                                    fill="#e7d2ad"
                                />
                                <path
                                    d="M180 141v-21"
                                    stroke="#493b29"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M180 120c-26-18-7-39 0-56 7 22 30 42 0 56"
                                    fill="#d99846"
                                />
                                <path
                                    d="M180 119c-12-10-4-23 0-33 6 12 12 26 0 33"
                                    fill="#fff1c5"
                                />
                                <rect
                                    x="120"
                                    y="183"
                                    width="120"
                                    height="71"
                                    rx="2"
                                    fill="#f8eddb"
                                />
                                <text
                                    x="180"
                                    y="214"
                                    textAnchor="middle"
                                    fill="#593e2b"
                                    fontFamily="Georgia, serif"
                                    fontSize="23"
                                >
                                    Lúmina
                                </text>
                                <text
                                    x="180"
                                    y="235"
                                    textAnchor="middle"
                                    fill="#7c634e"
                                    fontSize="8"
                                    letterSpacing="3"
                                >
                                    VELAS & AROMAS
                                </text>
                            </svg>
                        )}
                    </div>
                    {product ? (
                        <Link
                            className="lumina-hero__product"
                            to={`/detailProduct/${product._id}`}
                        >
                            <span>
                                <small>Descubrí este aroma</small>
                                <strong>{product.name}</strong>
                            </span>
                            <FiArrowUpRight aria-hidden="true" />
                            <span className="sr-only">Ver detalles</span>
                        </Link>
                    ) : (
                        <div className="lumina-hero__signature">
                            <span>{storeConfig.name}</span>
                            <small>Velas & aromas para tus momentos</small>
                        </div>
                    )}
                </div>
            </div>
            <div className="lumina-hero__bottom">
                <div
                    className="lumina-hero__pagination"
                    role="group"
                    aria-label="Elegir banner"
                >
                    {slides.map((item, i) => (
                        <button
                            key={item.theme}
                            type="button"
                            onClick={() => select(i)}
                            aria-label={`Banner ${i + 1}: ${item.title} ${item.accent}`}
                            aria-pressed={active === i}
                        >
                            <span className={active === i ? 'is-active' : ''} />
                        </button>
                    ))}
                </div>
                <span className="lumina-hero__count" aria-hidden="true">
                    0{active + 1}
                    <span> / 03</span>
                </span>
                <div className="lumina-hero__controls">
                    <button
                        type="button"
                        onClick={() => select(active - 1)}
                        aria-label="Banner anterior"
                    >
                        <FiChevronLeft />
                    </button>
                    <button
                        type="button"
                        onClick={() => select(active + 1)}
                        aria-label="Banner siguiente"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </section>
    )
}
