import React from 'react'
import ProductView from '@/components/ProductView'
import { productMockData } from '@/mockdata/mockdata'
import UpperText from '@/components/UpperText'
import LowerText from '@/components/LowerText'
import Navbar from '@/components/Navbar'

const page = () => {
    return (
        <div>
            <div className='flex flex-col justify-start lg:ml-15.5 lg:mr-18.5 lg:py-10 py-6 mx-5 lg:gap-10 gap-5  '>
                <div className='flex flex-col justify-start items-start w-full h-full gap-0.5 lg:gap-3 sm:gap-1 md:gap-1.5'>
                    <UpperText text="Our Products" />
                    <LowerText text="Explore Our Products" />
                </div>
                <ProductView products={productMockData} />
            </div>
        </div>
    )
}

export default page