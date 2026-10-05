import Link from 'next/link'
import { redirect } from 'next/navigation'

const AdminProductTablePagination = ({ page, totalPages }: { page: number, totalPages: number }) => {



    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav className='flex flex-row-reverse justify-center py-10 gap-3 text-sm items-center'>
            {
                (page < totalPages)
                && (
                    <Link href={`/admin/products?page=${page + 1}`} className='bg-white px-3 py-1 border border-gray-200'>
                        {">"}
                    </Link>
                )
            }
            <div className='flex items-center'>
                {
                    pages.map((nPage) => (
                        <Link 
                            key={nPage} 
                            className={`${nPage === page ? "bg-gray-100" : "bg-white"}  px-3 py-1 border border-gray-200 text-sm`} 
                            href={`/admin/products?page=${nPage}`}>
                            {nPage}
                        </Link>
                    ))
                }
             
            </div>
            {
                (page > 1)
                && (<Link href={`/admin/products?page=${page - 1}`} className='bg-white px-3 py-1 border border-gray-200'>
                    {"<"}
                </Link>
                )
            }
        </nav>
    )
}

export default AdminProductTablePagination