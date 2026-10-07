"use client"
import { ProductSchema } from '@/src/schema'
import React from 'react'

const AdminNewProductForm = ({ children }: { children: React.ReactNode }) => {

    const handleSubmit = (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            categoryId: formData.get("categoryId")
        }

        const result = ProductSchema.safeParse(data)
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto '>
            <form action={handleSubmit} className='space-y-3  '>

                {children}

                <input
                    type="submit"
                    className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 w-full p-3 uppercase font-bold cursor-pointer'
                />
            </form>
        </div>

    )
}

export default AdminNewProductForm