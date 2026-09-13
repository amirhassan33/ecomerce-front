import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

const WEBSITE_URL = 'https://desarrollowebamir.com.ar'

const Footer = () => {
    return (
        <footer className="pie" id="contacto">
            <div className="pie__contenido">
                <section className="pie__seccion pie__marca">
                    <a className="pie__titulo" href={`${WEBSITE_URL}/`}>
                        Servicios Amir y Cris
                    </a>
                    <p>
                        Soluciones web modernas, seguras y pensadas para hacer
                        crecer tu proyecto.
                    </p>
                    <span className="pie__tienda">Tienda demostrativa</span>
                </section>

                <nav className="pie__seccion" aria-label="Navegación del pie de página">
                    <h3 className="pie__subtitulo">Navegación</h3>
                    <a href={`${WEBSITE_URL}/`}>Inicio</a>
                    <a href={`${WEBSITE_URL}/pages/nosotros.html`}>Nosotros</a>
                    <a href={`${WEBSITE_URL}/pages/contacto.html`}>Contacto</a>
                </nav>

                <section className="pie__seccion pie__contacto">
                    <h3 className="pie__subtitulo">Hablemos</h3>
                    <a href="tel:+5491136260941">
                        <FiPhone aria-hidden="true" />
                        <span>+54 9 11 3626-0941</span>
                    </a>
                    <a href="mailto:cristiannasso2@gmail.com">
                        <FiMail aria-hidden="true" />
                        <span>cristiannasso2@gmail.com</span>
                    </a>
                    <p>
                        <FiMapPin aria-hidden="true" />
                        <span>Núñez, Capital Federal</span>
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
                    © 2026 Servicios Amir y Cris. Todos los derechos reservados.
                </p>
                <p>Diseñado con dedicación en Buenos Aires.</p>
            </div>
        </footer>
    )
}

export default Footer
