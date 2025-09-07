"use client";
import React from 'react'
import UpperText from './UpperText'
import LowerText from './LowerText'
import SearchCategoryCrousel from './SearchCategoryCrousel'
import { searchCategoryMockData } from '@/mockdata/mockdata';

const SearchCategoriesSlider = () => {
  return (
    <div className='flex flex-col border-b-[1px] border-gray-300 lg:ml-15.5 lg:mr-18.5 lg:py-18 py-9 mx-5 lg:gap-15 gap-9 '>
      <div className='flex flex-col justify-start gap-3 lg:gap-4 '>
        <div className='flex flex-col justify-start items-start w-full h-full gap-0.5 lg:gap-3 sm:gap-1 md:gap-1.5'>
          <UpperText text="Categories" />
          <LowerText text="Browse By Category" />
        </div>
        <SearchCategoryCrousel searchCategory={searchCategoryMockData} />
      </div>
    </div>
  )
}

export default SearchCategoriesSlider