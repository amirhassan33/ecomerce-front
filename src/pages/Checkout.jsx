import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { createOrder } from '../services/orderServices'
import toast from 'react-hot-toast'
import {
    FiArrowLeft,
    FiCheck,
    FiLock,
    FiMapPin,
    FiPackage,
    FiShield,
    FiShoppingBag,
} from 'react-icons/fi'

const money = (value) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(Number(value) || 0)

const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition placeholder:text-gray-400 focus:border-[#9b1c31] focus:ring-4 focus:ring-[#9b1c31]/10 ${
        hasError ? 'border-red-400 bg-red-50/40' : 'border-gray-200'
    }`

const FieldError = ({ message }) =>
    (message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null)

const Checkout = () => {
    const { cart, total, clearCart, loading: cartLoading } = useCart()
    const { userInfo: user } = useUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: user?.email || '',
            phone: '',
            street: '',
            number: '',
            city: '',
            state: '',
            zipCode: '',
        },
        mode: 'onChange',
    })

    const onSubmit = async (data) => {
        setLoading(true)

        try {
            const orderData = {
                items: cart.map((item) => ({
                    id: item._id,
                    title: item.name,
                    quantity: item.quantity || 1,
                    unit_price: item.price,
                    currency_id: 'ARS',
                })),
                payer: { email: data.email },
                shippingInfo: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: {
                        street: data.street,
                        number: data.number,
                        city: data.city,
                        state: data.state,
                        zipCode: data.zipCode,
                    },
                },
            }

            const response = await createOrder(orderData)

            if (response.success && response.paymentUrl) {
                toast.success('Orden creada. Te llevamos a Mercado Pago...')
                sessionStorage.setItem('checkoutCart', JSON.stringify(cart))
                const cleanUrl = response.paymentUrl.trim()
                setTimeout(() => {
                    window.location.href = cleanUrl
                }, 900)
            } else {
                throw new Error('No se recibió URL de pago')
            }
        } catch (error) {
            toast.error('No pudimos procesar tu pedido. Intentá nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    if (cartLoading) {
        return (
            <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-[#9b1c31]"></span>
                    <p className="mt-4 text-gray-600">Preparando tu compra...</p>
                </div>
            </div>
        )
    }

    if (!cart.length) {
        return (
            <div className="min-h-screen bg-[#f8f7f5] px-4 py-16">
                <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm border border-gray-100">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#9b1c31]/10 text-[#9b1c31]">
                        <FiShoppingBag size={28} />
                    </div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9b1c31]">Lúmina</p>
                    <h1 className="text-3xl font-black text-gray-900">Tu carrito está vacío</h1>
                    <p className="mt-3 text-gray-500">Agregá algún producto antes de continuar con la compra.</p>
                    <button
                        type="button"
                        onClick={() => navigate('/tienda')}
                        className="mt-7 rounded-xl bg-gray-900 px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-black"
                    >
                        Volver a la tienda
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8f7f5]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <button
                    type="button"
                    onClick={() => navigate('/tienda')}
                    className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900"
                >
                    <FiArrowLeft /> Volver a la tienda
                </button>

                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b1c31]">Lúmina · Finalizar compra</p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">Tu compra, a un paso.</h1>
                    <p className="mt-3 max-w-2xl text-gray-500">Completá tus datos y te llevaremos de forma segura a Mercado Pago para finalizar el pago.</p>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="rounded-2xl border border-[#9b1c31]/20 bg-white p-3 shadow-sm sm:p-4">
                        <div className="flex items-center gap-2 text-[#9b1c31]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#9b1c31] text-white"><FiCheck size={15} /></span><span className="text-xs font-bold sm:text-sm">Carrito</span></div>
                    </div>
                    <div className="rounded-2xl border border-[#9b1c31] bg-white p-3 shadow-sm sm:p-4">
                        <div className="flex items-center gap-2 text-[#9b1c31]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#9b1c31] text-white text-xs font-bold">2</span><span className="text-xs font-bold sm:text-sm">Tus datos</span></div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
                        <div className="flex items-center gap-2 text-gray-400"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">3</span><span className="text-xs font-bold sm:text-sm">Pago</span></div>
                    </div>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.75fr)]">
                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-7 flex items-start gap-4 border-b border-gray-100 pb-6">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#9b1c31]/10 text-[#9b1c31]"><FiMapPin size={22} /></div>
                            <div><h2 className="text-xl font-black text-gray-900">Datos de entrega</h2><p className="mt-1 text-sm text-gray-500">Necesitamos estos datos para preparar tu pedido.</p></div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <p className="mb-3 text-sm font-extrabold text-gray-900">Información personal</p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div><input {...register('firstName', { required: 'El nombre es requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' }, maxLength: { value: 50, message: 'Máximo 50 caracteres' }, pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras' } })} className={inputClass(errors.firstName)} placeholder="Nombre *" autoComplete="given-name" /> <FieldError message={errors.firstName?.message} /></div>
                                    <div><input {...register('lastName', { required: 'El apellido es requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' }, maxLength: { value: 50, message: 'Máximo 50 caracteres' }, pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras' } })} className={inputClass(errors.lastName)} placeholder="Apellido *" autoComplete="family-name" /> <FieldError message={errors.lastName?.message} /></div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Email</label><input {...register('email', { required: 'El email es requerido', pattern: { value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i, message: 'Email inválido' }, minLength: { value: 6, message: 'Mínimo 6 caracteres' }, maxLength: { value: 254, message: 'Máximo 254 caracteres' } })} className={inputClass(errors.email)} type="email" placeholder="tu@email.com *" autoComplete="email" /> <FieldError message={errors.email?.message} /></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Teléfono</label><input {...register('phone', { required: 'El teléfono es requerido', pattern: { value: /^[0-9+\-\s()]+$/, message: 'Formato de teléfono inválido' }, minLength: { value: 8, message: 'Mínimo 8 dígitos' }, maxLength: { value: 20, message: 'Máximo 20 caracteres' } })} className={inputClass(errors.phone)} type="tel" placeholder="11 1234 5678 *" autoComplete="tel" /> <FieldError message={errors.phone?.message} /></div>
                            </div>

                            <div>
                                <p className="mb-3 text-sm font-extrabold text-gray-900">Dirección</p>
                                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px]">
                                    <div><input {...register('street', { required: 'La calle es requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' }, maxLength: { value: 100, message: 'Máximo 100 caracteres' } })} className={inputClass(errors.street)} placeholder="Calle *" autoComplete="address-line1" /> <FieldError message={errors.street?.message} /></div>
                                    <div><input {...register('number', { required: 'El número es requerido', pattern: { value: /^[0-9a-zA-Z\s\-\/]+$/, message: 'Formato inválido' }, maxLength: { value: 10, message: 'Máximo 10 caracteres' } })} className={inputClass(errors.number)} placeholder="Número *" autoComplete="address-line2" /> <FieldError message={errors.number?.message} /></div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Ciudad</label><input {...register('city', { required: 'La ciudad es requerida', minLength: { value: 2, message: 'Mínimo 2 caracteres' }, maxLength: { value: 50, message: 'Máximo 50 caracteres' }, pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras' } })} className={inputClass(errors.city)} placeholder="Ciudad *" autoComplete="address-level2" /> <FieldError message={errors.city?.message} /></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Provincia</label><input {...register('state', { required: 'La provincia es requerida', minLength: { value: 2, message: 'Mínimo 2 caracteres' }, maxLength: { value: 50, message: 'Máximo 50 caracteres' }, pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras' } })} className={inputClass(errors.state)} placeholder="Provincia *" autoComplete="address-level1" /> <FieldError message={errors.state?.message} /></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Código postal</label><input {...register('zipCode', { required: 'El código postal es requerido', pattern: { value: /^[0-9A-Za-z\s\-]+$/, message: 'Formato inválido' }, minLength: { value: 3, message: 'Mínimo 3 caracteres' }, maxLength: { value: 10, message: 'Máximo 10 caracteres' } })} className={inputClass(errors.zipCode)} placeholder="Código postal *" autoComplete="postal-code" /> <FieldError message={errors.zipCode?.message} /></div>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                                <div className="flex gap-3"><FiShield className="mt-0.5 shrink-0 text-[#9b1c31]" /><p><strong className="text-gray-800">Tus datos están protegidos.</strong> Usamos la información únicamente para gestionar tu pedido y coordinar la entrega.</p></div>
                            </div>

                            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-950 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-gray-950/10 transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70">
                                {loading ? <><span className="loading loading-spinner loading-sm"></span> Procesando pedido...</> : <><FiLock /> Continuar a Mercado Pago <span className="text-lg">→</span></>}
                            </button>
                            <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-400"><FiLock size={12} /> Pago seguro procesado por Mercado Pago</p>
                        </form>
                    </div>

                    <aside className="lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                            <div className="bg-gray-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Tu selección</p><h2 className="mt-2 text-2xl font-black">Resumen del pedido</h2></div>
                            <div className="p-5 sm:p-6">
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item._id} className="flex gap-3">
                                            <div className="relative shrink-0"><img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-xl object-cover" /><span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-900 px-1 text-[11px] font-bold text-white">{item.quantity || 1}</span></div>
                                            <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-gray-900">{item.name}</p><p className="mt-1 text-xs text-gray-500">{money(item.price)} c/u</p></div>
                                            <p className="text-sm font-extrabold text-gray-900">{money(item.price * (item.quantity || 1))}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="my-6 border-t border-dashed border-gray-200" />
                                <div className="flex items-center justify-between text-sm text-gray-500"><span>Productos</span><span>{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} unidades</span></div>
                                <div className="mt-3 flex items-center justify-between text-sm text-gray-500"><span className="flex items-center gap-2"><FiPackage /> Envío</span><span className="font-semibold text-emerald-600">A coordinar</span></div>
                                <div className="my-5 border-t border-gray-100" />
                                <div className="flex items-end justify-between"><span className="text-base font-bold text-gray-700">Total</span><span className="text-3xl font-black tracking-tight text-gray-950">{money(total)}</span></div>
                                <div className="mt-6 space-y-3 rounded-2xl bg-[#f8f7f5] p-4 text-sm text-gray-600"><p className="flex gap-3"><FiShield className="mt-0.5 shrink-0 text-[#9b1c31]" /><span><strong className="text-gray-800">Compra segura</strong><br />Pagá de forma protegida con Mercado Pago.</span></p><p className="flex gap-3"><FiPackage className="mt-0.5 shrink-0 text-[#9b1c31]" /><span><strong className="text-gray-800">Entrega coordinada</strong><br />Nos pondremos en contacto para coordinar tu pedido.</span></p></div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Checkout
