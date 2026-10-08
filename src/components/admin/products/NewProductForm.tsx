"use client"
import { createProduct } from '@/app/actions/createProductAction'
import { ProductSchema } from '@/schema'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const AdminNewProductForm = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            categoryId: formData.get("categoryId"),
            image: formData.get("image")
        }

        const result = ProductSchema.safeParse(data)

        if (result.success) {
            const response = await createProduct(result.data)

            if (response?.errors) {
                toast.error(response?.errors)
                return
            }

            toast.success("Producto Creado")
            router.push("/admin/products")

        } else {
            result.error.issues.map((issue) => {
                toast.error(issue.message)
            })
        }
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