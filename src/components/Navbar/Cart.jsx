import ModalCart from './ModalCart'
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
                        className="btn btn-success btn-circle"
                    >
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {' '}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.9 9.667M7 13l-2.167 2.833A2.003 2.003 0 006 18h12a2.003 2.003 0 002-2V8a2.003 2.003 0 00-2-2H7m-5 8h14m-5-8v8m-5-8H9"
                                />
                            </svg>
                            <span className="badge badge-sm indicator-item">
                                {itemsQuantity}
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1000] mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">
                                {itemsQuantity} items
                            </span>
                            <span className="text-info">
                                Subtotal: ${total}
                            </span>
                            <div className="card-actions">
                                <button
                                    onClick={handleViewCartClick}
                                    className="btn btn-primary btn-block"
                                >
                                    View Cart
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
