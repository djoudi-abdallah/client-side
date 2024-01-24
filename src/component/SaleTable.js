import React ,{useEffect, useState} from 'react'
import ventesData from '../data.js/VenteData';
import TopBoard from './TopBoard';
import axios from 'axios';


function SaleTable() {
  
  const [recentlysale , setRecentlysale] = useState([]);

  const fetchRecentlysale = () => {
    axios
      .get('http://localhost:3001/dashbord/recentlysale/1')
      .then((response) => {
        setRecentlysale(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  };

  useEffect( ()=>{
    fetchRecentlysale();
  },)

  return (
    <div className='rounded-xl m-4  bg-white md:w-[96%] lg:w-[80%] shadow-2xl'>
     
      
      <h2 className="text-xl font-serif p-4">Recently Sales</h2>
      <div className='w-full flex flex-col items-center'>
         <div className='grid gap-2 grid-cols-4 md:grid-cols-6 text-center py-4 place-content-center justify-center  w-full font-serif'>
            <h1>Product</h1>
            <h1>Client</h1>
            <h1>Date</h1>
            <h1>Count</h1>
            <h1 className='hidden md:flex md:justify-center'>Total amount</h1>
            <h1 className='hidden md:flex  md:justify-center'>Status</h1>
        
         </div>   
    
      {recentlysale.map((sale) => (
        <div key={sale.code} className='grid gap-2 grid-cols-4 md:grid-cols-6 text-center place-content-center items-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{sale.code}</h1>
         <h1>{sale.client}</h1>
         <h1> {new Date(sale.dateVente).toLocaleDateString()}</h1>
         <h1>{sale.quantite}</h1>
         <h1 className='hidden md:flex md:place-content-center'>{sale.montantTotal}</h1>
         <h1 className="hidden md:flex md:place-content-center">{sale.status}</h1>
        </div>
      ))}</div>
     
    </div>

  )
}

export default SaleTable

