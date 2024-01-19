import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'
import NavBar from '../component/NavBar';
import TopBoard from '../component/TopBoard';
import TransfertsList from '../component/TransfertsList'
import ClientsList from '../component/ClientsList'
import EmployeList from '../component/EmployeList'
import ProduitsStockList from '../component/ProduitsStockList'
import PV from '../component/PV';



function Shop() {
  
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");
  console.log(idShop);
  
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch(activeComponent) {
      case 'transferts':
        return <TransfertsList />;
      case 'clients':
        return <ClientsList />;
      case 'employes':
        return <EmployeList />;
        case 'Produit':
          return <ProduitsStockList />;
        case 'PV':
          return <PV />;
        
      default:
        return null;
    }
  };
 
 
 
 
 
 
  return (
    <div className='flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto'>
       <NavBar/>
       <div className=' bg-white shadow-2xl m-4 rounded-xl jus'>
          
          <TopBoard/>
       </div>  

       <div className=' bg-white shadow-2xl m-4 rounded-xl jus'>
          
      <div className='rounded-xl grid grid-cols-3 place-content-center font-serif text-xl'>
              <h1 onClick={() => setActiveComponent('transferts')} className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${activeComponent === 'transferts' ? 'bg-white' : 'bg-orange-400'}`}>Liste Transferts</h1>
              <h1 onClick={() => setActiveComponent('clients')} className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${activeComponent === 'clients' ? 'bg-white' : 'bg-orange-400'}`}>Liste Clients</h1>
              <h1 onClick={() => setActiveComponent('employes')} className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Liste Employes</h1>
              <h1 onClick={() => setActiveComponent('Produit')} className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${activeComponent === 'Produit' ? 'bg-white' : 'bg-orange-400'}`}>Produit</h1>
              <h1 className='shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer'>Liste </h1>
              <h1 onClick={() => setActiveComponent('PV')} className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${activeComponent === 'PV' ? 'bg-white' : 'bg-orange-400'}`}>PV</h1>
       </div>
       <div>

       {renderComponent()}
       </div>
       </div>
         
    </div>
  )
}

export default Shop;
