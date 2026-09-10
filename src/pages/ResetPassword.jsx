import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { resetPasswordService } from '../services/authServices'

const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/

const ResetPassword = () => {
    const { token } = useParams()
    const [message, setMessage] = useState('')
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: 'onChange' })

    const onSubmit = async (data) => {
        setLoading(true)
        setServerError('')

        try {
            const response = await resetPasswordService(token, data.password)
            setMessage(response.message)
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                    'No se pudo restablecer la contraseña.',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-[500px] mx-auto mt-16 px-4">
            <h1 className="text-3xl font-bold text-center mb-3">
                Crear nueva contraseña
            </h1>
            <p className="text-center text-base-content/70 mb-8">
                Debe tener 8 caracteres, mayúscula, minúscula, número y un
                carácter especial.
            </p>

            {message ? (
                <div className="space-y-5 text-center">
                    <div className="alert alert-success">{message}</div>
                    <Link to="/login" className="btn btn-primary">
                        Iniciar sesión
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <input
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {
                                value: 8,
                                message: 'Debe tener al menos 8 caracteres',
                            },
                            pattern: {
                                value: passwordPattern,
                                message:
                                    'Debe incluir mayúscula, minúscula, número y carácter especial',
                            },
                        })}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Nueva contraseña"
                        className={`input input-bordered w-full ${
                            errors.password ? 'input-error' : ''
                        }`}
                    />
                    {errors.password && (
                        <p className="text-error text-sm">
                            {errors.password.message}
                        </p>
                    )}

                    <input
                        {...register('confirmPassword', {
                            required: 'Repetí la contraseña',
                            validate: (value) =>
                                value === getValues('password') ||
                                'Las contraseñas no coinciden',
                        })}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Repetir contraseña"
                        className={`input input-bordered w-full ${
                            errors.confirmPassword ? 'input-error' : ''
                        }`}
                    />
                    {errors.confirmPassword && (
                        <p className="text-error text-sm">
                            {errors.confirmPassword.message}
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
                        {loading ? 'Guardando...' : 'Guardar contraseña'}
                    </button>
                </form>
            )}
        </main>
    )
}

export default ResetPassword
