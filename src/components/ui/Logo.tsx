import React from 'react'
import Image from 'next/image';

const Logo = () => {
  return (
    <div className='flex justify-center py-5'>
        <div className='relative size-20 sm:size-22 md:size-28  2xl:size-35'>
            <Image
                fill
                alt="Logotipo Fresh Coffe"
                src={"/logo.svg"}
            />
        </div>
    </div>
  )
}

export default Logo