import Heading from '@/app/components/ui/Heading'
import AdminProductForm from '@/app/components/admin/products/AdminProductForm';
import AdminEditProductForm from '@/app/components/admin/products/AdminEditProductForm';
import { prisma } from '@/prisma/prismaAdapter';
import { notFound } from 'next/navigation';
import GoBackButton from '@/app/components/ui/GoBackButton';


const getProductById = async (id: number) => {

  const product = await prisma.product.findUnique({
    where: {
      id: id
    }
  })
  if (!product) notFound()

  return product
}

const EditProductPage = async ({ params }: { params: { id: string } }) => {

  const { id } = await params
  const product = await getProductById(+id)

  return (
    <>
      <Heading>Editar el producto: {product.name}</Heading>
      <GoBackButton/>
      <AdminEditProductForm>
        <AdminProductForm product={product} />
      </AdminEditProductForm>
    </>
  )
}

export default EditProductPage