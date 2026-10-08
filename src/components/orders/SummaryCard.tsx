"use client"
import { formatPrice } from '@/lib/formatPrice'
import { useStore } from '@/store/store'
import { OrderItem } from '@/types/order'

const SummaryCard = ({ product }: { product: OrderItem }) => {

    const removeProduct = useStore((state) => state.removeProduct)
    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    return (
        <div className='bg-white flex flex-col p-3 border-b border-gray-200 last-of-type:border-none gap-4 shadow-lg/5' key={product.id}>
            <div className='flex justify-between gap-3'>
                <h1 className='font-black text-lg'>{product.name}</h1>
                <div className=''>
                    <button className='rounded-full border-2 border-red-500 text-red-500 p-1 w-7 text-xs font-semibold cursor-pointer'
                        onClick={() => removeProduct(product.id)}
                    >X</button>
                </div>
            </div>
            <h2 className='font-black text-amber-500 text-xl'>{formatPrice(product.price)}</h2>
            <div className='flex gap-3 bg-gray-100 text-lg w-24 rounded-lg'>
                <button className='flex-1 cursor-pointer' onClick={() => decreaseQuantity(product.id)}>-</button>
                <p className='text-sm flex items-center font-semibold'>{product.quantity}</p>
                <button className='flex-1 cursor-pointer' onClick={() => increaseQuantity(product.id)}>+</button>
            </div>
            <div>
                <p><strong>Subtotal: </strong>{formatPrice(product.subtotal)}</p>
            </div>
        </div>
    )
}

export default SummaryCard