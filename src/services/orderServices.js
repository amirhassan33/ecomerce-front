import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL + '/orders'

axios.defaults.withCredentials = true

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, orderData)
        return response.data
    } catch (error) {
        throw new Error('Error al crear la orden', { cause: error })
    }
}

export const getMyOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-orders`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener tus órdenes', { cause: error })
    }
}

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/all`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener los pedidos', { cause: error })
    }
}
