import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlinePointOfSale } from "react-icons/md";

function TopBoardcentre({ centreId }) {
  const [topData, setTopData] = useState({
    topEmployee: '',
    topClient: '',
    topProduct: '',
    profit: ''
  });

  useEffect(() => {
    if (centreId) {
      axios.get(`http://localhost:3001/centretop/${centreId}`)
        .then(response => {
          // Assuming the response data has the structure { topEmployee, topClient, topProduct, profit }
          setTopData(response.data);
        })
        .catch(error => console.error('Error fetching top data:', error));
    }
  }, [centreId]);

  return (
    <div className='py-4 grid gap-3 grid-cols-2 lg:grid-cols-4 lg:gap-8 my-2 mx-10 justify-center'>
     
      <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
        <MdOutlinePointOfSale size={25} color='orange'/>
        <div>
          <h1>Top Employe</h1>
          <span className='font-bold'>{topData.topEmployee.nom}</span>
        </div> 
      </div>
     
      <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
        <MdOutlinePointOfSale size={25} color='orange'/>
        <div>
          <h1>Top Client</h1>
          <span className='font-bold'>{topData.topClient.nom}</span>
        </div> 
      </div>
     
      <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
        <MdOutlinePointOfSale size={25} color='orange'/>
        <div>
          <h1>Top Product</h1>
          <span className='font-bold'>{topData.topProduct.name}</span>
        </div> 
      </div>
     
      <div className='bg-gray-400/20 text-black w-full justify-evenly rounded-xl flex font-mono py-4 text-center items-center'>
        <MdOutlinePointOfSale size={25} color='orange'/>
        <div>
          <h1>Profit</h1>
          <span className='font-bold'>{topData.profit}</span>
        </div> 
      </div>

      
      
    </div>
  )
}

export default TopBoardcentre;
