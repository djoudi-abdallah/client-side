import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LineChart from '../component/LineChart';
import NavBar from '../component/NavBar';
import vegetable from '../pictures/vegetable.png';
import SaleTable from '../component/SaleTable';
import PieChart from '../component/PercentageCircle';
import axios from 'axios'
import TopBoard from '../component/TopBoard';





function Dashboard() {
  const cookieValue = Cookies.get('token');
  const navigate = useNavigate();
  useEffect(()=>{
    if (!cookieValue) 
    navigate('/Login');
  })
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/dashbord/topproduct')
      .then(response => {
        setTopProducts(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits les plus vendus', error);
      });
  },);
  
  
  
return (
       <div className='w-full md:w-[77%] lg:w-[80%] '>
        <NavBar/>
          <div className='w-full h-full pb-20  bg-gray-300/30 overflow-y-scroll scroll-smooth'>
         
          <TopBoard/>
        
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
          
          
           <SaleTable/> 
          
           
             <div className='md:[96%] lg:w-[40%]'>
             <div className='flex flex-col rounded-xl m-4 shadow-2xl  bg-white '>
               <h1 className='text-xl p-6 font-serif'>Produit le plus vendu :</h1>
               {topProducts.map((prd) => (
  <div className='flex w-full items-center font-serif text-xl text-black'>
    <img className='w-10 h-10 pl-2 mb-1' src={vegetable} alt="Vegetable" />
    {prd.productDetails && (
      <p className='justify-between px-6 flex w-full '>
        <h1 className='items-center'>{prd._id}</h1>
        <h1>{prd.productDetails?.name}</h1>
        <h1>{prd.productDetails?.price}</h1>
      </p>
    )}
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
