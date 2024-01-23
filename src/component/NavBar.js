import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {CiHome} from 'react-icons/ci'
import { FcSalesPerformance } from "react-icons/fc";
import { FaShopSlash } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { DiCoda } from "react-icons/di";
import { GiStockpiles} from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdNoTransfer } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";



function NavBar() {
    const location = useLocation();
    const currentPageName = location.pathname.split('/').pop();
    const [isMenu, setMenu] = useState(false);
    const [showStakeholders, setShowStakeholders] = useState(false);
    const [showShops, setShowShops] = useState(false);
    const toggleStakeholders = () => {
      setShowStakeholders(!showStakeholders);
    };
    const toggleShops = () => {
      setShowShops(!showShops);
    };
    return (
      isMenu ? 
    
      <div className=' bg-gray-300/20 flex flex-col pl-6 py-2 text-orange-400 h-screen items-center'>
      {/* Ge-Stock */}
      <div className='flex items-center font-bold py-4 text-3xl Consolas'>
        <DiCoda />
        <h1 className='px-8'>GE-STOCK</h1>
        <ImCross  onClick={()=>setMenu(false)} />
      </div>
      {/* Sidebar Menu */}
      <ul className='text-xl py-16 font-mono'>
              <li className='flex py-2 items-center cursor-pointer'>
              <Link className='flex' to='/Dashboard'>
                 <CiHome color='orange' size={25} />
                 <h1 className='md:px-4 lg:px-14'>Dashboard</h1>
              </Link> 
              </li>
              <li className='flex py-2 items-center cursor-pointer'>
              <Link className='flex' to='/Ventes'>
                <FcSalesPerformance color='orange' size={25} />
                <h1 className='md:px-4 lg:px-14'>Ventes</h1>
              </Link>
              </li>
              <li className='flex py-2 items-center cursor-pointer'>
              <Link className='flex' to='/Achats' >
                <TiShoppingCart color='orange' size={25} />
                <h1 className='md:px-4 lg:px-14'>Acahts</h1>
              </Link>
              </li>
             
              <li className='flex py-2  cursor-pointer'>
              <FaMoneyBillTransfer color='orange'  size={25} />
              <div className='flex flex-col items-center'>
              <h1 onClick={toggleStakeholders} className='md:px-4 lg:px-14'>Stackholder</h1>
              {showStakeholders && (
                  <ul className='mt-2 text-orange-400'>
                  <Link to='/Employe'>
                    <li className='pl-4 m-2'  >Employe</li>
                  </Link>  
                  <Link to='/Fournisseur'>  
                     <li className='pl-4 m-2' >Fournisseur</li>
                  </Link>
                  <Link to='/Client'>                    
                    <li className='pl-4 m-2' >Client</li>
                  </Link>
                  </ul>
              )}
              </div>
              </li>
              <li className='flex py-2 cursor-pointer'>
              <FaShopSlash color='orange' size={25} />
              <div className='flex flex-col items-center'>
              <h1 onClick={toggleShops} className='md:px-4 lg:px-14'>Shops</h1>
              {showShops && (
                  <ul className='mt-2 text-orange-400'>
                  <Link to={`/shop?id=2`}>
                    <li className='pl-4 m-2'  >First</li>
                  </Link>  
                  <Link to={`/shop?id=3`}>  
                     <li className='pl-4 m-2' >second</li>
                  </Link>
                  <Link to={`/shop?id=4`}>                    
                    <li className='pl-4 m-2' >third</li>
                  </Link>
                  </ul>
              )}
              </div>
              </li>
              <li className='flex py-2 items-center cursor-pointer'>
                <Link className='flex' to='/Stock'>
                  <GiStockpiles color='orange' size={25} />
                  <h1 className='md:px-4 lg:px-14'>Stock</h1>
                </Link>
              </li>
              <li className='flex py-2 items-center cursor-pointer'>
                <Link className='flex' to='/Transfert'>
                  <MdNoTransfer color='orange' size={25} />
                  <h1 className='md:px-4 lg:px-14'>Transfert</h1>
                </Link>
              </li>
              <li className='flex py-2 items-center cursor-pointer'>
                <Link className='flex' to='/Massrouf'>
                  <MdOutlineAttachMoney color='orange' size={25} />
                  <h1 className='md:px-4 lg:px-14'>Massrouf</h1>
                </Link>
              </li>
            </ul>
  </div>
      
       : 
       <div className='bg-gray-300/30 px-5 py-5 flex items-center justify-between bg-white overflow-hidden'>
      {/* menu icon */}
      <div className='flex items-center'>
        <IoMenu onClick={() => setMenu(true)} className='flex sm:hidden' size={30} />
        {console.log(isMenu)}
        <h1 className='text-2xl font-bold px-2'>{currentPageName}</h1>
      </div>
      
      {/* button */}
      <div className='flex items-center '>
      < IoMdNotifications size={30}  className='mx-4 text-orange-400'/>
      <CgProfile size={30} className='text-blue-500'/>
      </div>
    </div>
    );
    
}

export default NavBar
