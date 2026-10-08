
import Heading from '@/components/ui/Heading'
import React from 'react'
import ProductForm from '@/components/admin/products/ProductForm';
import AdminNewProductForm from '@/components/admin/products/NewProductForm';

const NewProductPage = () => {
  return (
    <>
      <Heading>Crear producto</Heading>
      <AdminNewProductForm>
        <ProductForm />
      </AdminNewProductForm>
    </>
  )
}

export default NewProductPage