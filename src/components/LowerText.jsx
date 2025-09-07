import React from 'react'
import Timer from './Timer'

const LowerText = ({ text, time = null }) => {


    return (
        <div className='flex justify-start items-end gap-4 lg:gap-16 mx-1.5'>
            <div className='lg:text-3xl text-xl font-semibold text-gray-900'>{text}</div>
            {time &&
                <div>
                    <Timer expiryTimestamp={time} />
                </div>}
        </div>
    )
}

export default LowerText