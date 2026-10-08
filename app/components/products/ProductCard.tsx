import { formatPrice } from '@/src/lib/formatPrice'
import { Product } from '@/src/generated/prisma/client'
import Image from 'next/image'
import AddProductToCart from './AddProductToCart'
import { getImagePath } from '../../../src/lib/getImagePath';


type ProductCardType = {
    product: Product
}

const ProductCard = ({ product }: ProductCardType) => {
    return (
        <div key={product.id} className='flex flex-col font-black bg-white border border-gray-100 space-y-3 shadow-lg/5'>

            <Image
                width={400}
                height={400}
                src={getImagePath(product.image)}
                alt={`Imagen de producto ${product.name}`}
            />

            <div className='flex flex-col flex-1 p-2 gap-2 justify-between'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl text-amber-500'>{product.name}</h1>
                    <p className='text-xl'>{formatPrice(product.price)}</p>
                </div>
                <AddProductToCart product={product}/>
            </div>
        </div>
    )
}

export default ProductCard