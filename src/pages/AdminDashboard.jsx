import { Routes, Route } from 'react-router-dom'
import TableProductDashboard from '../components/AdminDashboard/TableProductDashboard/TableProductDashboard'
import DashboardLayout from '../layout/DashboardLayout'
import CreateProduct from './CreateProduct'
import UpdateProduct from './UpdateProducts'
import AdminOrders from './AdminOrders'

const AdminDashboard = () => {
    return (
        <section>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<TableProductDashboard />} />
                    <Route
                        path="products"
                        element={<TableProductDashboard />}
                    />
                    <Route
                        path="products/createProduct"
                        element={<CreateProduct />}
                    />
                    <Route
                        path="products/updateProduct/:id"
                        element={<UpdateProduct />}
                    />
                    <Route path="orders" element={<AdminOrders />} />
                </Route>
            </Routes>
        </section>
    )
}

export default AdminDashboard
