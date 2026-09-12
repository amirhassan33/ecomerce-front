import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

const Layout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="mx-auto w-full max-w-[1200px] px-6">
                <Navbar />
            </div>

            <main className="mx-auto w-full max-w-[1200px] flex-1 px-6">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layout