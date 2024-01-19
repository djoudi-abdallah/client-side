import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import TopBoard from './TopBoard';

function ProduitsStockList() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {

    const shopId = searchParams.get('id');
    
    if (shopId) {
      axios.get(`http://localhost:3001/produitStock?shopId=${shopId}`)
        .then(response => {
          setProducts(response.data); 
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
    }
  }, [searchParams]);
  const handleEditClick = (product) => {
    console.log('Editing product:', product);
   
  };
  
  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };
  
  const handleDeleteClick = (product) => {
    console.log('Deleting product:', product);
   
  };

  return (
    <div className='bg-white w-full rounded-xl shadow-2xl'>
      <TopBoard/>
      <h2 className="text-xl font-serif px-10 py-6">Product Stock Table:</h2>
      <div className='w-full flex flex-col items-center'>
        <div className='grid gap-2 grid-cols-4 text-center py-4 place-content-center w-full font-serif'>
          <h1>Code</h1>
          <h1>Name</h1>
          {/* <h1>Status</h1> */}
          <h1>quantite</h1>
          <h1>Edit</h1>
        </div>   

        {products.map((prd, index) => (
          <div key={index} className='grid gap-2 grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
            <h1>{prd.code}</h1>
            <h1>{prd.name}</h1>
            {/* <h1>{prd.status}</h1> */}
            <h1>{prd.quantite}</h1>
            <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
            <VscTrash onClick={handleDeleteClick} className='cursor-pointer text-red-500' />
            <VscEdit onClick={handleEditClick} className='cursor-pointer text-blue-500 ml-2' />
          </>
        ) : (
          <VscActivateBreakpoints className='cursor-pointer text-red-600' />
        )}
      </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProduitsStockList;
