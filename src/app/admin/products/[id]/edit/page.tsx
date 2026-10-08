import Heading from '@/components/ui/Heading'
import ProductForm from '@/components/admin/products/ProductForm';
import EditProductForm from '@/components/admin/products/EditProductForm';
import { prisma } from '@/prisma/prismaAdapter';
import { notFound } from 'next/navigation';
import GoBackButton from '@/components/ui/GoBackButton';


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
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}

export default EditProductPage