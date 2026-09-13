import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FiUserPlus } from 'react-icons/fi'
import { loginService } from '../../services/authServices'
import { useUser } from '../../context/UserContext'
import toast from 'react-hot-toast'
import { Link, Navigate, useLocation } from 'react-router-dom'
const LoginForm = () => {
    const location = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
    })

    const { setUserInfo, userInfo } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const onSubmit = async (data) => {
        const result = await loginService(data, reset, setRedirect, setUserInfo)
        if (result.succes) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    if (redirect) {
        const destination =
            location.state?.from ||
            (userInfo.isAdmin ? '/admin/dashboard' : '/')

        return <Navigate to={destination} replace />
    }

    return (
        <form
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <input
                    {...register('email', {
                        required: 'El correo electrónico es requerido',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'El correo electrónico no es válido',
                        },
                        minLength: {
                            value: 6,
                            message:
                                'El correo electrónico debe tener al menos 5 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message:
                                'El correo electrónico no puede tener más de 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${errors.email ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Correo electrónico"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="relative">
                <input
                    {...register('password', {
                        required:
                            'La contraseña es requerida [6 - 254 caracteres de longitud]',
                        minLength: {
                            value: 6,
                            message:
                                'La contraseña debe tener al menos 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message:
                                'La contraseña no puede tener más de 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${errors.password ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    autoComplete="current-password"
                />
                <button
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                        showPassword
                            ? 'Ocultar contraseña'
                            : 'Mostrar contraseña'
                    }
                    type="button"
                    className="cursor-pointer absolute right-4 top-[20px] transform -translate-y-1/2
                    text-gray-600"
                >
                    {showPassword ? (
                        <FaEyeSlash size={23} />
                    ) : (
                        <FaEye size={23} />
                    )}
                </button>

                {errors.password && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors duration-300"
            >
                Iniciar sesión
            </button>
            <Link
                to="/forgot-password"
                className="text-center text-sm text-primary hover:underline"
            >
                ¿Olvidaste tu contraseña?
            </Link>
            <div className="mt-2 border-t border-base-300 pt-5 text-center">
                <p className="mb-3 text-sm text-base-content/70">
                    ¿Todavía no tenés una cuenta?
                </p>
                <Link
                    to="/register"
                    className="btn btn-outline btn-primary w-full gap-2"
                >
                    <FiUserPlus aria-hidden="true" />
                    Crear cuenta
                </Link>
            </div>
        </form>
    )
}

export default LoginForm
