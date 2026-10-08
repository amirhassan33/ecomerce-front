import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { storeConfig } from '../../config/storeConfig'

const WEBSITE_URL = 'https://desarrollowebamir.com.ar'

const Footer = () => {
    return (
        <footer className="pie" id="contacto">
            <div className="pie__contenido">
                <section className="pie__seccion pie__marca">
                    <a className="pie__titulo" href="/">
                        {storeConfig.name}
                    </a>
                    <p>
                        {storeConfig.tagline} Una propuesta de tienda online pensada para disfrutar y comprar de forma simple.
                    </p>
                    <span className="pie__tienda">Tienda online</span>
                </section>

                <nav className="pie__seccion" aria-label="Navegación del pie de página">
                    <h3 className="pie__subtitulo">Explorá</h3>
                    <a href="/">Inicio</a>
                    <a href="/#productos">Productos</a>
                    <a href="/#contacto">Contacto</a>
                </nav>

                <section className="pie__seccion pie__contacto">
                    <h3 className="pie__subtitulo">¿Querés una tienda así?</h3>
                    <a href="tel:+5491136260941" aria-label="Llamar a Desarrollo Web Amir">
                        <FiPhone aria-hidden="true" />
                        <span>+54 9 11 3626-0941</span>
                    </a>
                    <a href="mailto:cristiannasso2@gmail.com" aria-label="Enviar email a Desarrollo Web Amir">
                        <FiMail aria-hidden="true" />
                        <span>cristiannasso2@gmail.com</span>
                    </a>
                    <p>
                        <FiMapPin aria-hidden="true" />
                        <span>Buenos Aires, Argentina</span>
                    </p>
                </section>

                <section className="pie__seccion">
                    <h3 className="pie__subtitulo">Seguinos en redes</h3>

                    <div className="redessociales">
                        <a
                            href="https://www.linkedin.com/in/cristian-alejandro-nasso/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <img src="/img/linkedin.webp" alt="" />
                        </a>

                        <a
                            href="https://www.instagram.com/desarrollowebamir/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <img src="/img/instagram.webp" alt="" />
                        </a>

                        <a
                            href="https://x.com/desarrolloamir"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X"
                        >
                            <img src="/img/x.webp" alt="" />
                        </a>
                    </div>
                </section>
            </div>

            <div className="pie__inferior">
                <p>
                    © 2026 Lúmina. Todos los derechos reservados.
                </p>
                <p>Una experiencia de compra simple, cálida y segura.</p>
            </div>
        </footer>
    )
}

export default Footer
