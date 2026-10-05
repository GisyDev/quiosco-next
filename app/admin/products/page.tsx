import Heading from '@/app/components/ui/Heading';
import { prisma } from '@/prisma/prismaAdapter';
import AdminProductTable from '../../components/admin/products/AdminProductTable';
import AdminProductTablePagination from '../../components/admin/products/AdminProductTablePagination';
import Link from 'next/link';
import AdminProductSearch from '../../components/admin/products/AdminProductSearch';

const getProducts = async (page: number, pageSize: number) => {
  return await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      category: true
    }
  })
}

const getCountProduct = async () => {
  return await prisma.product.count()
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>


const ProductsPage = async ({ searchParams }: { searchParams: { page: string } }) => {

  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1
  const pageSize = 10

  const [products, countProduct] = await Promise.all([
    getProducts(page, pageSize),
    getCountProduct()
  ])

  const totalPages = Math.ceil(countProduct / pageSize)


  return (
    <section>
      <Heading>
        Administrar productos
      </Heading>
      <div className='flex justify-between items-center'>
        <Link
          href={`/admin/products/new`}
          className='bg-amber-400 w-full text-xs px-10 py-2 text-center font-bold cursor-pointer lg:w-auto lg:justify-between text-gray-700'
          >
          Crear producto
        </Link>

        <AdminProductSearch/>
      </div>
      <AdminProductTable products={products} />

      <AdminProductTablePagination page={page} totalPages={totalPages} />
    </section>
  )
}

export default ProductsPage