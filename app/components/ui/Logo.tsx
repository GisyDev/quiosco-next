import React from 'react'
import Image from 'next/image';

const Logo = () => {
  return (
    <div className='flex justify-center mt-5 '>
        <div className='relative w-32 h-32'>
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