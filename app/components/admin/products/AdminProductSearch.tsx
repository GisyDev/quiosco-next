"use client"

import { productSearch } from '@/src/schema'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

const AdminProductSearch = () => {

    const handleSearchForm = (formData: FormData) => {

        const data = {
            search: formData.get("search")
        }

        const result = productSearch.safeParse(data)

        if (result.success) {

            redirect(`/admin/products?search?search=${result.data.search}`)


        } else {
            result.error.issues.map((issue) => {
                toast.error(issue.message)
                console.error(result.error.message)
            })
        }


    }

    return (
        <form
            action={handleSearchForm}
            className='text-xs'>
            <input type="text" placeholder='Buscar Producto' className='bg-white p-2' name='search' />
            <input type="submit" value={"BUSCAR"} className='bg-indigo-500 p-2 text-white' />
        </form>
    )
}

export default AdminProductSearch