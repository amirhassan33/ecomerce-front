import { Link, useSearchParams } from 'react-router-dom'
import { FaCheckCircle, FaRegClock, FaShoppingBag, FaReceipt } from 'react-icons/fa'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const merchantOrder = searchParams.get('merchant_order_id')
  const reportedStatus = searchParams.get('status')

  // Los parámetros de la URL son informativos: no prueban que el pago esté acreditado.
  // La confirmación definitiva debe venir del backend, consultando a Mercado Pago.
  return (
    <main className="min-h-[calc(100vh-100px)] bg-[#F8F3EF] px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[28px] border border-[#EBDDD3] bg-white shadow-[0_20px_65px_rgba(72,42,29,0.08)]">
        <div className="h-2 bg-gradient-to-r from-[#9B421E] via-[#A51F46] to-[#4B3030]" />
        <div className="px-6 py-10 text-center sm:px-12 sm:py-12">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7E8DD]">
            <FaRegClock className="text-4xl text-[#9B5136]" aria-hidden="true" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#A1644B]">Lúmina · Velas & Aromas</p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#392723] sm:text-4xl">¡Gracias por tu compra!</h1>
          <p className="mx-auto max-w-sm leading-relaxed text-[#77665F]">
            Recibimos tu regreso desde Mercado Pago. Estamos verificando el estado de tu operación.
          </p>
          <div className="mt-8 rounded-2xl border border-[#EFE2D8] bg-[#FBF7F3] p-5 text-left">
            <div className="mb-4 flex items-center gap-2 text-[#563B32]">
              <FaCheckCircle className="text-[#B27B5D]" aria-hidden="true" />
              <h2 className="font-semibold">Detalles de la operación</h2>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-wrap justify-between gap-2"><dt className="text-[#87736A]">Verificación</dt><dd className="font-medium text-[#805638]">Pendiente de confirmación</dd></div>
              {paymentId && <div className="flex flex-wrap justify-between gap-2"><dt className="text-[#87736A]">ID de pago</dt><dd className="break-all font-medium text-[#49342C]">{paymentId}</dd></div>}
              {merchantOrder && <div className="flex flex-wrap justify-between gap-2"><dt className="text-[#87736A]">Orden de Mercado Pago</dt><dd className="break-all font-medium text-[#49342C]">{merchantOrder}</dd></div>}
              {reportedStatus && <div className="flex flex-wrap justify-between gap-2"><dt className="text-[#87736A]">Estado informado por el retorno</dt><dd className="font-medium text-[#49342C]">{reportedStatus}</dd></div>}
            </dl>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#87736A]">
            Podés consultar tus pedidos para ver su estado. La acreditación debe confirmarse desde nuestro sistema.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <Link to="/" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4B302B] px-5 py-3 font-semibold text-white transition hover:bg-[#6C4035]">
              <FaShoppingBag aria-hidden="true" /> Volver a la tienda
            </Link>
            <Link to="/orders" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#D8BEB0] px-5 py-3 font-semibold text-[#4B302B] transition hover:bg-[#FBF7F3]">
              <FaReceipt aria-hidden="true" /> Ver mis pedidos
            </Link>
          </div>
          <p className="mt-8 text-xs tracking-wide text-[#AA8D7F]">Pequeños momentos, grandes aromas ✨</p>
        </div>
      </div>
    </main>
  )
}

export default PaymentSuccess
