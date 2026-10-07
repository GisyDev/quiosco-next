
import Heading from '@/app/components/ui/Heading'
import React from 'react'
import AdminNewProductForm from '@/app/components/admin/products/AdminNewProductForm';
import AdminProductForm from '@/app/components/admin/products/AdminProductForm';

const NewProductPage = () => {
  return (
    <>
      <Heading>Crear producto</Heading>
      <AdminNewProductForm>
        <AdminProductForm />
      </AdminNewProductForm>
    </>
  )
}

export default NewProductPage