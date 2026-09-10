import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { forgotPasswordService } from '../services/authServices'

const ForgotPassword = () => {
    const [message, setMessage] = useState('')
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' })

    const onSubmit = async ({ email }) => {
        setLoading(true)
        setMessage('')
        setServerError('')

        try {
            const response = await forgotPasswordService(email)
            setMessage(response.message)
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                    'No se pudo procesar la solicitud.',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-[500px] mx-auto mt-16 px-4">
            <h1 className="text-3xl font-bold text-center mb-3">
                Recuperar contraseña
            </h1>
            <p className="text-center text-base-content/70 mb-8">
                Ingresá tu correo y te enviaremos un enlace que vence en 15
                minutos.
            </p>

            {message ? (
                <div className="space-y-5 text-center">
                    <div className="alert alert-success">{message}</div>
                    <Link to="/login" className="btn btn-primary">
                        Volver a iniciar sesión
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <input
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'El correo electrónico no es válido',
                            },
                        })}
                        type="email"
                        autoComplete="email"
                        placeholder="Correo electrónico"
                        className={`input input-bordered w-full ${
                            errors.email ? 'input-error' : ''
                        }`}
                    />
                    {errors.email && (
                        <p className="text-error text-sm">
                            {errors.email.message}
                        </p>
                    )}
                    {serverError && (
                        <div className="alert alert-error">{serverError}</div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        {loading ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                    <Link
                        to="/login"
                        className="text-center text-sm hover:underline"
                    >
                        Volver a iniciar sesión
                    </Link>
                </form>
            )}
        </main>
    )
}

export default ForgotPassword
