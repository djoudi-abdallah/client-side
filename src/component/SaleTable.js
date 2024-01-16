import React ,{useState} from 'react'
import ventesData from '../data.js/VenteData';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from './TopBoard';


function SaleTable() {
    const formatDate = (date) => new Date(date).toLocaleDateString();
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

  return (
    <div className='rounded-xl m-4  bg-white md:w-[96%] lg:w-[80%] shadow-2xl'>
     <TopBoard/>
      
      <h2 className="text-xl font-serif p-4">Sales Table</h2>
      <div className='w-full flex flex-col items-center'>
         <div className='grid gap-2 grid-cols-5 md:grid-cols-7 text-center py-4 place-content-center  w-full font-serif'>
            <h1>Product</h1>
            <h1>Client</h1>
            <h1>Date</h1>
            <h1>Count</h1>
            <h1 className='hidden md:flex md:text-center'>Total amount</h1>
            <h1 className='hidden md:flex md:text-center'>Paiment Type</h1>
            <h1>Edit</h1>
         </div>   
    
      {ventesData.map((sale) => (
        <div key={sale.produit} className='grid gap-2 grid-cols-5 md:grid-cols-7 text-center place-content-center items-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{sale.produit}</h1>
         <h1>{sale.client}</h1>
         <h1>{sale.dateVente.toLocaleTimeString()}</h1>
         <h1>{sale.quantite}</h1>
         <h1 className='hidden md:flex md:place-content-center'>{sale.quantite*sale.prixUnitaire}</h1>
         <h1 className="hidden md:flex md:place-content-center">{sale.prixUnitaire*sale.quantite}</h1>
         <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
            <VscTrash onClick={handleDeleteClick} className='cursor-pointer text-red-500' />
            <VscEdit onClick={handleEditClick} className='cursor-pointer text-blue-500 ml-2' />
          </>
        ) : (
          <VscActivateBreakpoints className='cursor-pointer' />
        )}
      </div>
        </div>
      ))}</div>
     
    </div>

  )
}

export default SaleTable

