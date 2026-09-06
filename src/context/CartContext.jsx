import { createContext, useState, useEffect, useContext, Children } from 'react'
import { useUser } from './UserContext'
import {
    addToCartService,
    getCartService,
    updateCartService,
    removeFromCartService,
    clearCartService,
    getCartTotalService,
} from '../services/cartService'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [itemsQuantity, setItemsQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const {
        userInfo,
        getUserId,
        isAuthenticated,
        loading: userLoading,
    } = useUser()
    const loadLocalCart = () => {
        try {
            const localCart = localStorage.getItem('cart')
            return localCart ? JSON.parse(localCart) : []
        } catch (error) {
            console.error('Error al cargar el carito local:', error)
            return []
        }
    }

    const saveLocalCart = (cartItems) => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        } catch (error) {
            console.error('Error al guardar carrito local', error)
        }
    }

    const loadCart = async () => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                const response = await getCartService(userId)
                const cartItems = response.cart?.products?.map(
                    (product) =>
                        ({
                            _id: product.productId._id,
                            name: product.productId.name,
                            price: product.productId.price,
                            imageUrl: product.productId.imageUrl,
                            description: product.productId.description,
                            stock: product.productId.stock,
                            quantity: product.quantity,
                        }) || [],
                )
                setCart(cartItems)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        } else {
            const localCart = loadLocalCart()
            setCart(localCart)
            setLoading(false)
        }
    }

    const syncCartWithBackend = async () => {
        const localCart = loadLocalCart()
        if (localCart.length > 0 && isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                for (const item of localCart) {
                    try {
                        await addToCartService(userId, item._id, item.quantity)
                    } catch (error) {
                        console.error(
                            `Error al sincronizar producto ${item.name}`,
                        )
                    }
                }
                localStorage.removeItem('cart')
                await loadCart()
                toast.success('Carrito sincronizado con exito')
            } catch (error) {
                console.error('Error al sincronizar carrito', error)
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        let isMounted = true
        const initializeCart = async () => {
            await new Promise((resolve) => setTimeout(resolve, 100))
            if (!isMounted) return
            const previousAuthState = localStorage.getItem('wasAuthenticated')
            const currentAuthState = isAuthenticated()
            if (!previousAuthState && currentAuthState) {
                await syncCartWithBackend()
            } else {
                await loadCart()
            }
            localStorage.setItem(
                'wasAuthenticated',
                currentAuthState.toString(),
            )
            setLoading(false)
        }
        initializeCart()
        return () => {
            isMounted = false
        }
    }, [userLoading])

    const addToCart = async (product, quantity = 1) => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await addToCartService(userId, product._id, quantity)
                await loadCart()
                toast.success('Producto agregado al carrito')
            } catch (error) {
                console.error('Error al agregar producto al carrito', error)
                toast.error('Error al agregar producto al carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const currentCart = [...cart]
                const existingIndex = currentCart.findIndex(
                    (item) => item._id === product._id,
                )
                if (existingIndex > -1) {
                    currentCart[existingIndex].quantity += quantity
                } else {
                    currentCart.push({ ...product, quantity })
                    setCart(currentCart)
                    saveLocalCart(currentCart)
                    toast.success('Producto agregado al carrito')
                }
            } catch (error) {
                console.error('Error al agregar al carrito loal:', error)
                toast.error('Error al agregar producto al carrito')
            }
        }
    }

    const removeFromCart = async (productId) => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await removeFromCartService(userId, productId)
                await loadCart()
                toast.success('Producto eliminado del carrito')
            } catch (error) {
                console.error('Error al eliminar producto del carrito', error)
                toast.error('Error al eliminar producto del carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const currentCart = cart.filter(
                    (item) => item._id !== productId,
                )
                setCart(currentCart)
                saveLocalCart(currentCart)
                toast.success('Producto eliminado del carrito')
            } catch (error) {
                console.error(
                    'Error al eliminar producto del carrito local',
                    error,
                )
                toast.error('Error al eliminar producto del carrito local')
            }
        }
    }

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error('La cantidad debe ser al menos 1')
            return
        }
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await updateCartService(userId, productId, newQuantity)
                await loadCart()
                toast.success('Cantidad actualizada')
            } catch (error) {
                console.error('Error al actualizar la cantidad', error)
                toast.error('Error al actualizar la cantidad')
            }
        } else {
            try {
                const currentCart = cart.map((item) =>
                    item._id === productId
                        ? { ...item, quantity: newQuantity }
                        : item,
                )
                setCart(currentCart)
                saveLocalCart(currentCart)
                toast.success('Cantidad actualizada')
            } catch (error) {
                console.error('Error al actualizar la cantidad local', error)
                toast.error('Error al actualizar la cantidad')
            }
        }
    }

    const clearCart = async () => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await clearCartService(userId)
                setCart([])
                toast.success('Carrito vacio')
            } catch (error) {
                console.error('Error al vaciar el carrito', error)
                toast.error('Error al vaciar el carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setCart([])
                saveLocalCart([])
                toast.success('Carrito vacio')
            } catch (error) {
                console.error('Error al vaciar el carrito local', error)
                toast.error('Error al vaciar el carrito local')
            }
        }
    }

    useEffect(() => {
        const previousAuthState =
            localStorage.getItem('wasAuthenticated') === 'true'
        const currentAuthState = isAuthenticated()
        if (previousAuthState !== currentAuthState && cart.length === 0) {
            loadCart()
            localStorage.setItem(
                'wasAuthenticated',
                currentAuthState.toString(),
            )
        }
    }, [])

    useEffect(() => {
        if (userLoading) return
        if (userInfo?.id) {
            ;(async () => {
                try {
                    const localCart = loadLocalCart()
                    if (localCart.length > 0) {
                        await syncCartWithBackend()
                    } else {
                        await loadCart()
                    }
                } catch (error) {
                    console.error(
                        'Error al cargar/sincronizar carrito tras login',
                        error,
                    )
                }
            })()
        } else {
            try {
                setCart(loadLocalCart())
            } catch (error) {
                console.error(
                    'Error al cargar el carrito local tras logout',
                    error,
                )
            }
        }
    }, [userInfo?.id, userLoading])

    useEffect(() => {
        const newTotal = cart.reduce(
            (acc, item) => acc + item.price * (item.quantity || 1),
            0,
        )
        setTotal(newTotal)
        const newItemsQuantity = cart.reduce(
            (acc, item) => acc + (item.quantity || 1),
            0,
        )
        setItemsQuantity(newItemsQuantity)
    }, [cart])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                itemsQuantity,
                isModalOpen,
                closeModal,
                loading,
                addToCart,
                removeFromCart,
                clearCart,
                openModal,
                updateQuantity,
                loadCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
