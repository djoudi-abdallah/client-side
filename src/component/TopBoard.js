import React from 'react'
import { MdOutlinePointOfSale } from "react-icons/md";

function TopBoard() {
  return (
    <div className=' py-4 grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 my-2 mx-10 justify-center'>
               {/* first */}
               
                  <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
                    <MdOutlinePointOfSale size={25} color='orange'/>
                   <div>
                    <h1>Achats</h1>
                    <span className='font-bold'>987</span>
                  </div> 
                  </div>
                  <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
                    <MdOutlinePointOfSale size={25} color='orange'/>
                   <div>
                    <h1>Achats</h1>
                    <span className='font-bold'>987</span>
                  </div> 
                  </div>
                  <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
                    <MdOutlinePointOfSale size={25} color='orange'/>
                   <div>
                    <h1>Achats</h1>
                    <span className='font-bold'>987</span>
                  </div> 
                  </div>
                  <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
                    <MdOutlinePointOfSale size={25} color='orange'/>
                   <div>
                    <h1>Achats</h1>
                    <span className='font-bold'>987</span>
                  </div> 
                  </div>
                  
               
          </div>
  )
}

export default TopBoard
