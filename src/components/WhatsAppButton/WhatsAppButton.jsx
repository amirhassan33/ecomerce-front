import { FaWhatsapp } from 'react-icons/fa6'

const WHATSAPP_URL =
    'https://wa.me/5491136260941?text=Hola%2C%20quisiera%20consultar%20por%20un%20producto%20de%20la%20tienda.'

const WhatsAppButton = () => {
    return (
        <a
            className="whatsapp-flotante"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            title="Consultar por WhatsApp"
        >
            <FaWhatsapp aria-hidden="true" />
            <span>¿Necesitás ayuda?</span>
        </a>
    )
}

export default WhatsAppButton
