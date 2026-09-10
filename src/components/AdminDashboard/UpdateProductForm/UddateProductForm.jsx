import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useProduct } from '../../../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const UpdateProductForm = ({ product }) => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(product.imageUrl)
    const [imageError, setImageError] = useState('')
    const { updateProduct } = useProduct()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: product,
    })
    const onSubmit = async (data) => {
        const result = await updateProduct(product._id, { ...data, image })
        if (result.success) {
            toast.success(result.message)
            navigate('/admin/dashboard/products')
        } else {
            toast.error(result.message)
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files?.[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

        if (!file) return

        if (!allowedTypes.includes(file.type)) {
            setImage(null)
            setImageError('La imagen debe ser JPG, PNG o WebP')
            event.target.value = ''
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setImage(null)
            setImageError('La imagen no puede superar los 5 MB')
            event.target.value = ''
            return
        }

        setImage(file)
        setPreview(URL.createObjectURL(file))
        setImageError('')
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            <div>
                <input
                    {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 3,
                            message: 'Minimo 3 caracteres',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Maximo 50 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded focus:outline-primary w-full ${errors.name ? 'border-red-400 outline-red-400 focus:outline-red-400' : ''}`}
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    autoComplete="name"
                />
                {errors.name && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('description', {
                        required: 'La descripcion es requerido',
                        minLength: {
                            value: 10,
                            message: 'Minimo 10 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Maximo 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded focus:outline-primary w-full ${errors.description ? 'border-red-400 outline-red-400 focus:outline-red-400' : ''}`}
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    autoComplete="description"
                />
                {errors.description && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.description.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('price', {
                        required: 'El precio debe ser mayor a uno',
                        min: {
                            value: 2,
                            message: 'Minimo 3 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded focus:outline-primary w-full ${errors.price ? 'border-red-400 outline-red-400 focus:outline-red-400' : ''}`}
                    type="number"
                    placeholder="Precio"
                    name="price"
                    autoComplete="price"
                />
                {errors.price && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.price.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('stock', {
                        required: 'El stock es requerido',
                        minLength: {
                            value: 0,
                            message:
                                'El stock minimo debe ser mayor o igual a cero',
                        },
                    })}
                    className={`p-2 outline-2 rounded focus:outline-primary w-full ${errors.stock ? 'border-red-400 outline-red-400 focus:outline-red-400' : ''}`}
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    autoComplete="stock"
                />
                {errors.stock && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.stock.message}
                    </p>
                )}
            </div>
            <div className="space-y-3">
                <label className="font-medium block">Imagen del producto</label>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                />
                <p className="text-sm text-base-content/60">
                    Si no elegís otra imagen, se conservará la actual.
                </p>
                {imageError && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {imageError}
                    </p>
                )}
                {preview && (
                    <img
                        src={preview}
                        alt="Vista previa del producto"
                        className="w-full max-h-72 object-contain rounded-lg border border-base-300 bg-base-200"
                    />
                )}
            </div>
            <button className="btn btn-primary" type="submit">
                Actualizar producto
            </button>
        </form>
    )
}

export default UpdateProductForm
