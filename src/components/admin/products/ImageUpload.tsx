"use client"
import { CldUploadWidget } from 'next-cloudinary'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import Image from 'next/image'
import { getImagePath } from '@/lib/getImagePath'

const ImageUpload = ({ image }: { image: string | undefined }) => {

    const [ImageUrl, setImageUrl] = useState<string>("");

    console.log("ImageUrl:", ImageUrl);
    console.log(ImageUrl ? ImageUrl : image);

    return (
        <CldUploadWidget
            onSuccess={(results, { widget }) => {
                if (results.event === "success" && results.info) {
                    widget.close()
                    setImageUrl(results.info.url)
                }
            }}
            uploadPreset="quiosoco-next-product"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => (
                <>
                    <div>
                        <label htmlFor=""> Imagen Producto: </label>

                        <div className='flex justify-center bg-gray-100 w-full h-50'
                            onClick={() => open()}
                        >
                            {
                                ImageUrl
                                    ? <Image src={ImageUrl} alt="" width={200} height={200} />
                                    : <div className='flex flex-col justify-center gap-3 items-center'>
                                        <FaUpload size={40} className='text-neutral-500' />
                                        <p className='text-sm text-neutral-500'>Agregar imagen</p>
                                    </div>
                            }

                        </div>

                        {
                            image && !ImageUrl && <div className='mt-5'>
                                <p className='text-sm font-bold mb-1'>Imagen actual:</p>
                                <Image src={getImagePath(image)} alt="" width={200} height={200} />
                            </div>
                        }


                        <input type="hidden" name='image' defaultValue={ImageUrl ? ImageUrl : image} />
                    </div>
                </>
            )
            }
        </CldUploadWidget>
    )
}

export default ImageUpload