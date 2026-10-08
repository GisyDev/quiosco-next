"use client"

import { productSearch } from '@/src/schema'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const AdminProductSearch = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const [searchInputValue, setSearchInputValue] = useState(searchParams.get("search"));


    const handleSearchForm = (formData: FormData) => {

        const data = {
            search: formData.get("search")
        }

        const result = productSearch.safeParse(data)

        if (result.success) {
            params.set('page', "1")
            params.set('search', result.data.search);
        } else {
            result.error.issues.map((issue) => {
                toast.error(issue.message)
            })
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    const handleRemoveSearch = () => {
        params.delete('search');
        router.replace(`${pathname}?${params.toString()}`);
        setSearchInputValue("")
    }

    return (
        <div className='flex'>
            {
                searchParams.get("search") && (
                    <form action={handleRemoveSearch} className='text-xs me-2'>
                        <input type="submit" value={"X"} className='bg-red-500 p-2 text-white cursor-pointer' />
                    </form>
                )
            }

            <form
                action={handleSearchForm}
                className='text-xs'>
                <input type="text" placeholder='Buscar Producto' className='bg-white p-2' name='search' 
                onChange={(value) => setSearchInputValue(value.target.value)}
                value={searchInputValue || ""}/>
                <input type="submit" value={"BUSCAR"} className='bg-indigo-500 p-2 text-white cursor-pointer hover:bg-indigo-600 transition-all' />
            </form>
        </div>

    )
}

export default AdminProductSearch