"use client"
import { CldUploadWidget } from 'next-cloudinary'
import React from 'react'
import { FaUpload } from 'react-icons/fa'

const AdminImageUpload = () => {
    return (
        <CldUploadWidget
            uploadPreset="quiosoco-next-product"
            
            options={{
                maxFiles: 1,
            }}
            onSucess={(result: { widget }) => {
                console.log(result);
            }}
            >
            {({ open }) => (
                <>
                    <div>
                        <label htmlFor=""> Imagen Producto: </label>
                        <div className='flex flex-col justify-center gap-3 items-center bg-gray-100 w-full h-50'
                            onClick={() => open()}
                        >
                            <FaUpload size={40} className='text-neutral-500' />
                            <p className='text-sm text-neutral-500'>Agregar imagen</p>
                        </div>

                    </div>


                </>
            )
            }
    </CldUploadWidget >
  )
}

export default AdminImageUpload