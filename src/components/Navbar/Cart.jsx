import ModalCart from './ModalCart'
import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

const Cart = () => {
    const { total, itemsQuantity, openModal, isModalOpen } = useCart()
    const handleViewCartClick = () => {
        document.activeElement.blur()
        openModal()
    }
    return (
        <>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        aria-label="Abrir carrito"
                        className="btn btn-circle min-h-0 h-11 w-11 border border-base-300 bg-base-100 text-base-content shadow-sm hover:border-slate-400 hover:bg-base-200"
                    >
                        <div className="indicator">
                            <FiShoppingBag className="h-5 w-5" />
                            {itemsQuantity > 0 && (
                                <span className="badge badge-primary badge-sm indicator-item border-2 border-base-100 font-bold">
                                    {itemsQuantity}
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1000] mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">
                                {itemsQuantity} productos
                            </span>
                            <span className="text-info">
                                Subtotal: ${total}
                            </span>
                            <div className="card-actions">
                                <button
                                    onClick={handleViewCartClick}
                                    className="btn btn-primary btn-block"
                                >
                                    Ver carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <ModalCart />}
        </>
    )
}

export default Cart
