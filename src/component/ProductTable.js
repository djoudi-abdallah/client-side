import React , {useState} from 'react'
import vegetableProducts from '../data.js/vegetableProducts';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import { FaSearch } from "react-icons/fa";

import TopBoard from './TopBoard';
import ProductModal from './ProductModel';


function ProductTable() {
    var [filteredProducts, setFilteredProducts] = useState(vegetableProducts);
    const [searchTerm, setSearchTerm] = useState('');
  
    
    const handleChange = (e) => {
        const trimmedValue = e.target.value.trim();
        setSearchTerm(trimmedValue);
      };
      
        filteredProducts = vegetableProducts.filter((prd) =>
        prd.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    

        const [isEditing, setIsEditing] = useState(false);

        const handleIconClick = () => {
            setIsEditing(!isEditing);
          };
    
        const handleEditClick = () => {
            
            console.log('Editing sale:');
          };
        
        const handleDeleteClick = () => {
           
            console.log('Deleting sale:');
          };

          const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
 
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveProduct = (product) => {
    setProducts([...products, product]);
  };

    
    return (
    <div className=' m-4  w-[97%] '>
    <div className='flex items-center'> 
     <div className='m-4 w-[85%] px-1 bg-white rounded shadow-xl flex items-center'>
     <input
          className='p-3 w-[96%] border-none'
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
      <FaSearch/>
     </div>
     <div className=''>
      <button
        className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
        onClick={openModal}
      >
        Add Product
      </button>
      <ProductModal isOpen={isModalOpen} onClose={closeModal} onSave={saveProduct} />
     
      </div>
      </div>
     
    <div className='bg-white w-full rounded-xl shadow-2xl'>
     <TopBoard/>
      <h2 className="text-xl font-serif px-10 py-6">Sales Table :</h2>
      <div className='w-full flex flex-col items-center'>
         <div className='grid gap-2 grid-cols-5  text-center py-4 place-content-center  w-full font-serif'>
            <h1>Code</h1>
            <h1>Name</h1>
            <h1>Status</h1>
            <h1>Price</h1>
            <h1>Edit</h1>
         </div>   
    
      {filteredProducts.map((prd , index) => (
        <div key={index} className='grid gap-2 grid-cols-5 text-center place-content-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{prd.code}</h1>
         <h1>{prd.name}</h1>
         <h1>{prd.status}</h1>
         <h1>{prd.price}</h1>
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
      ))}</div>
      </div>
     
    </div>
  )
}

export default ProductTable;
