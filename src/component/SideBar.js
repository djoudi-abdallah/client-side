import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import {CiHome} from 'react-icons/ci'
import { FcSalesPerformance } from "react-icons/fc";
import { FaShopSlash } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdTouchApp } from "react-icons/md";
import { DiCoda } from "react-icons/di";
import { GiStockpiles } from "react-icons/gi";
import { MdNoTransfer } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { GoEyeClosed } from "react-icons/go";


function SideBar() {
 
  const [showStakeholders, setShowStakeholders] = useState(false);
  const [showShops, setShowShops] = useState(false);

  const toggleStakeholders = () => {
    setShowStakeholders(!showStakeholders);
  };
  const toggleShops = () => {
    setShowShops(!showShops);
  };
  
  
  return (
    
       <div className=' bg-white  items-start pl-6 py-2 text-black hidden sm:flex sm:flex-col sm:w-[30%] md:w-[30%] lg:w-[20%] overflow-x-hidden overscroll-y-auto'>
            {/* Ge-Stock */}
            <div className='flex items-center font-bold md:py-4 text-3xl Consolas'>
              <DiCoda color='orange' />
              <h1 className='px-8'>GE-STOCK</h1>
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
              <li className='flex py-2 items-center cursor-pointer'>
                <Link className='flex' to='/Salary'>
                  <GiPayMoney color='orange' size={25} />
                  <h1 className='md:px-4 lg:px-14'>Salary</h1>
                </Link>
              </li>
              <li className='flex py-2 items-center cursor-pointer'>
                <Link className='flex' to='/Absence'>
                  <GoEyeClosed color='orange' size={25} />
                  <h1 className='md:px-4 lg:px-14'>Absence</h1>
                </Link>
              </li>
            </ul>
        </div>
    
  )
}

export default SideBar
