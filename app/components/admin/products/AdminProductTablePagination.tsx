"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const AdminProductTablePagination = ({ page, totalPages }: { page: number, totalPages: number }) => {

    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function pageUrl(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));

        router.replace(`${pathname}?${params.toString()}`)
    }


    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav className='flex flex-row-reverse justify-center py-10 gap-3 text-sm items-center'>
            {
                (page < totalPages)
                && (
                    <button
                        onClick={() => pageUrl(page + 1)}
                        className='bg-white px-3 py-1 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all'
                    >
                        {">"}
                    </button>
                )
            }
            <div className='flex items-center'>
                {
                    pages.map((nPage) => (
                        <button
                            key={nPage}
                            className={`${nPage === page ? "bg-gray-100" : "bg-white"}  px-3 py-1 border border-gray-200 text-sm cursor-pointer hover:bg-gray-100 transition-all`}
                            onClick={() => pageUrl(nPage)}>
                            {nPage}
                        </button>
                    ))
                }

            </div>
            {
                (page > 1)
                && (<button onClick={() => pageUrl(page - 1)} className='bg-white px-3 py-1 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all'>
                    {"<"}
                </button>
                )
            }
        </nav>
    )
}

export default AdminProductTablePagination