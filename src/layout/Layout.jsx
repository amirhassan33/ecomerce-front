import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'

const Layout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#f7f7fc]">
            <div className="mx-auto w-full max-w-[1200px] px-2 sm:px-6">
                <Navbar />
            </div>

            <main className="mx-auto w-full max-w-[1200px] flex-1 px-6">
                <Outlet />
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    )
}

export default Layout
