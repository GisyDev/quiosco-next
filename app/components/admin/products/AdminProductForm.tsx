import { prisma } from '@/prisma/prismaAdapter'
import React from 'react'
import AdminImageUpload from './AdminImageUpload';

const getCategories = async () => {
  return await prisma.category.findMany()
}

const AdminProductForm = async () => {

  const categories = await getCategories()

  return (
    <>
      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="name"
        >Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="price"
        >Precio:</label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="categoryId"
        >Categoría:</label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
        >
          <option value="">-- Seleccione --</option>
          {
            categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>

            ))
          }
        </select>
        <AdminImageUpload/>
      </div>
    </>
  )
}

export default AdminProductForm


