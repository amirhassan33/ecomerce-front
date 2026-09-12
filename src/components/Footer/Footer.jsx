const Footer = () => {
    return (
        <footer className="pie" id="contacto">
            <div className="pie__contenido">
                <section className="pie__seccion">
                    <h2 className="pie__titulo">Amir y Cris</h2>
                    <p>Productos artesanales hechos con dedicación.</p>
                </section>

                <section className="pie__seccion">
                    <h3 className="pie__subtitulo">Contacto</h3>

                    <a href="tel:+5491136260941">
                        +54 9 11 3626-0941
                    </a>

                    <a href="mailto:cristiannasso2@gmail.com">
                        cristiannasso2@gmail.com
                    </a>

                    <p>Núñez, Capital Federal</p>
                </section>

                <section className="pie__seccion">
                    <h3 className="pie__subtitulo">Seguinos</h3>

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
            </div>
        </footer>
    )
}

export default Footer