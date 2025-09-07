import Link from 'next/link'
import React from 'react'

const ViewProductsButton = ({ text, href }) => {

    return (
        <Link href={href} className='bg-red-500 text-white lg:py-3 lg:px-5 py-2 px-3 rounded-sm text-sm lg:text-base hover:bg-red-600 transition duration-300 ease-in-out self-center'>{text}
        </Link>
    )
}

export default ViewProductsButton