"use client"

import { updateProductAction } from '@/app/actions/updateProductAction'
import { ProductSchema } from '@/src/schema'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'




const AdminEditProductForm = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()
    const params = useParams()

    console.log(params);

    const handleSubmit = async (formData: FormData) => {

        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            categoryId: formData.get("categoryId"),
            image: formData.get("image")
        }

        console.log(data);
        const result = ProductSchema.safeParse(data)

        if (result.success && params.id) {
            const response = await updateProductAction(result.data, +params.id)

            if (response?.errors) {
                toast.error(response?.errors)
                return
            }

            toast.success("Producto Editado")
            router.push("/admin/products")

        } else {
            if (result.error) {
                result.error.issues.map((issue) => {
                    toast.error(issue.message)
                })
            }
        }
    }



    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto '>
            <form action={handleSubmit} className='space-y-3'>

                {children}

                <input
                    type="submit"
                    className='bg-amber-400 hover:bg-amber-500 text-white mt-5 w-full p-3 uppercase font-bold cursor-pointer'
                    value={"Editar"}
                />
            </form>
        </div>
    )
}

export default AdminEditProductForm