import { formatPrice } from '@/app/lib/formatPrice'
import { Product } from '@/src/generated/prisma/client'
import Image from 'next/image'

type ProductCardType = {
    product: Product
}

const ProductCard = ({ product }: ProductCardType) => {
    return (
        <div key={product.id} className='font-black bg-white p-3 border border-gray-100 space-y-5 shadow-lg/5'>
            
            <Image
                width={300}
                height={300}
                src={`/products/${product.image}.jpg`}
                alt={`Imagen de producto ${product.name}`}
            />

            <div className='space-y-2'>
                <h1 className='text-xl text-amber-500'>{product.name}</h1>
                <p className='text-xl'>{formatPrice(product.price)}</p>
            </div>

            <button
                type='button'
                className='bg-indigo-600 hover:bg-indigo-800 text-white w-full uppercase cursor-pointer p-2'
            >
            Agregar
            </button>

        </div>
    )
}

export default ProductCard