import React from 'react'
import ProductiList from '../components/ProductiList'

const Dashboard = ( {onApplyClick} ) => {
  return (
    <>
      <ProductiList onApplyClick={onApplyClick}  />
    </>
  )
}

export default Dashboard
