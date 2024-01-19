import React from 'react'
import NavBar from '../component/NavBar'
import TopBoard from '../component/TopBoard';

function FirstShop() {
  return (
    <div className='flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto'>
       <NavBar/>
       <div className=' bg-white shadow-2xl m-4 rounded-xl jus'>
          
          <TopBoard/>
       </div>  

       <div className=' bg-white shadow-2xl m-4 rounded-xl jus'>
          
      <div className='rounded-xl grid grid-cols-3 place-content-center font-serif text-xl'>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Liste Transferts</h1>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Liste Clients</h1>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Liste Employes</h1>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Produit/Stock</h1>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Liste </h1>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>PV</h1>
             
          
       </div>
       </div>
         
    </div>
  )
}

export default FirstShop;
