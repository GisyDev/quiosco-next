"use client"

import { Product } from "@/src/generated/prisma/client"
import { useStore } from "@/src/store/store"

const AddProductToCart = ({ product }: { product: Product }) => {

    const addToCart = useStore((state) => state.addToCart)

    return (
        <button
            type='button'
            className='bg-indigo-600 hover:bg-indigo-700 text-white w-full uppercase cursor-pointer p-2'
            onClick={() => addToCart(product)}
        >
            Agregar
        </button>
    )
}

export default AddProductToCart