import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import slugify from "slugify";

const SearchCategoryCard = ({ id, image, title }) => {
    return (
        <Link href={`/catalog/${slugify(title, { replacement: "-", lower: true })}`} >
            <div className='rounded-md relative hover:cursor-pointer hover:shadow-xs lg:hover:shadow-sm hover:bg-gray-100 border-[1px] border-gray-400'>

                <div className='w-full h-full  flex justify-center items-center px-5 pb-0.5 pt-4 rounded-md'>
                    <Image className='object-contain object-center w-full h-full' src={image} alt={title} width={50} height={0} />
                </div>

                <div className='flex flex-col justify-center items-center gap-1 w-full h-full rounded-md pb-2.5'>
                    <p className='text-xs sm:text-sm md:text-base text-ellipsis overflow-hidden whitespace-nowrap w-full text-center'>{title}</p>
                </div>

            </div>
        </Link>


    )

}

export default SearchCategoryCard