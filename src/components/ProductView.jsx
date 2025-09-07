import React from 'react'
import ProductCard from './ProductCard'

const ProductView = ({products}) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map((product) => (
            <ProductCard 
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.name}
                price={product.price}
                rating={product.rating}
                ratingCount={product.totalRatings}
                discount={product.discount}
            />
        ))}
    </div>
  )
}

export default ProductView