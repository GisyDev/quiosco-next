"use client"


import Image from 'next/image';
import { Category } from '../../../src/generated/prisma/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type CategoryIcon = {
    category: Category
}


const CategoryIcon = ({ category }: CategoryIcon) => {

    const params = useParams<{category: string}>()

    return (
        <Link className={`flex gap-5 items-center font-bold border-t border-gray-200 w-full p-3 last-of-type:border-b 
        ${category.slug === params.category ? "bg-amber-400" : ""}`}
        href={`/order/${category.slug}`}
        >
            <div className='relative size-16'>
                <Image
                    src={`/icon_${category.slug}.svg`}
                    alt={`Imagen de la categoria: ${category.name}`}
                    fill
                />
            </div>
            <p>{category.name}</p>
        </Link>

    )
}

export default CategoryIcon