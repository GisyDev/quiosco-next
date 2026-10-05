import React, { ReactNode } from 'react'

const Heading = ({ children }: { children: ReactNode }) => {
    return (
        <h1 className='font-semibold text-2xl my-5'>
            {children}
        </h1>
    )
}

export default Heading