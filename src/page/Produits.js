import React, { useState } from 'react';
import NavBar from '../component/NavBar';
import ProductTable from '../component/ProductTable';



function Produits  () {
  
  return (
    <div className='bg-gray-300/30 w-full md:w-[77%] lg:w-[82%]   '>
      <NavBar/>
    <div className='flex items-center '>
      <div className='w-full mr-2'>
      <ProductTable/>
      </div>
     
      </div>
       
    
    </div>
    )
};

export default Produits;
