import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LineChart from '../component/LineChart';
import NavBar from '../component/NavBar'
import vegetableProducts from '../data.js/vegetableProducts';
import vegetable from '../pictures/vegetable.png'
import SaleTable from '../component/SaleTable';
import PieChart from '../component/PercentageCircle';





function Dashboard() {
  const cookieValue = Cookies.get('token');
  const navigate = useNavigate();
  useEffect(()=>{
    if (!cookieValue) 
    navigate('/Login');
  })
  
  
  const productData = {
    name: 'Sample Product',
    percentages: [30, 60, 90], // Example percentages for features
  };

  return (
       <div className='w-full md:w-[77%] lg:w-[80%] '>
        <NavBar/>
        <div className='w-full h-full pb-20  bg-gray-300/30 overflow-y-scroll scroll-smooth'>
         
          
        
          <div className='flex flex-col w-full md:flex-row md:items-center'>
             <div className='flex flex-col md:w-[65%] rounded-xl m-4  bg-white shadow-2xl'>
               <h1 className='text-xl p-6 font-serif'>Taux des ventes :</h1>
               <div className='w-full p-4'> 
               <LineChart/>
              </div>
             </div>
            
            <div className='flex flex-col  bg-white rounded-2xl shadow-2xl md:w-[35%]  m-2'>
            <h1 className='text-xl p-4 px-6 font-serif'>Taux des ventes :</h1>
             <div className='w-full flex justify-center p-2'> 
              <PieChart/>
              </div>
            </div>
            </div>
         
          <div className='w-full flex flex-col md:flex-cols lg:flex lg:flex-row'>
           {/* sales table or recent buings */}
          
          
          
           <SaleTable/> 
          
           
             {/* top ventes */}
             <div className='md:[96%] lg:w-[40%]'>
             <div className='flex flex-col rounded-xl m-4 shadow-2xl  bg-white '>
               <h1 className='text-xl p-6 font-serif'>Produit le plus vendu :</h1>
                {/* products div */}
             
                {vegetableProducts.map((prd) => (
                  <div key={prd.id} className='flex w-full items-center font-serif text-xl '>
                    <img className='w-10 h-10 pl-4 pb-2 mb-1' src={vegetable} />
                    <p className='justify-between px-6 flex w-full'>
                      <h1>{prd.name}</h1>
                      <h2>{prd.price}$</h2>
                    </p>
                  </div>
                ))}
                
             </div>
             </div>
      
          </div>
            {/* chart DIV */}
            
           
        </div>
      </div>
  )
}

export default Dashboard
