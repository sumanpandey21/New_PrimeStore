import React from 'react'

const UpperText = ({ text }) => {
    return (
        <div>
            <div className='flex justify-start items-center gap-1.5 text-[15px] lg:text-base  lg:gap-2 font-semibold mx-1.5'>
                <div className='bg-red-500 lg:w-4.5 lg:h-10 w-4 h-9 rounded-sm'></div>
                <div className='text-red-600 '>{text}</div>
            </div>
        </div>
    )
}

export default UpperText