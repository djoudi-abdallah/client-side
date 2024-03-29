import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../component/NavBar";
import TopBoard from "../component/TopBoard";
import TransfertsList from "../component/TransfertsList";
import ClientsList from "../component/ClientsList";
import EmployeList from "../component/EmployeList";
import ProduitsStockList from "../component/ProduitsStockList";
import PV from "../component/PV";
import VentesList from "../component/VentesList";
import TopBoardcentre from "../component/TopBoardcentre";
import PieChart from "../component/PercentageCircle";
import LineChart from "../component/LineChart";
import SaleTable from "../component/SaleTable";
import vegetable from "../pictures/vegetable.png";
import axios from "axios";
import Graphe from "../component/Graphe";
import CentreSalesGraph from "../component/CentreSalesGraph";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");
  const [topProducts, setTopProducts] = useState([]);



   const [recentlysale , setRecentlysale] = useState([]);

  const fetchRecentlysale = () => {
    axios
      .get(`http://localhost:3001/dashbord/recentlysale/${idShop}`)
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
  useEffect(() => {
    axios
      .get("http://localhost:3001/dashbord/topproduct")
      .then((response) => {
        setTopProducts(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des produits les plus vendus",
          error
        );
      });
  });

  const [activeComponent, setActiveComponent] = useState("");

  const renderComponent = () => {
    switch (activeComponent) {
      case "transferts":
        return <TransfertsList />;
      case "clients":
        return <ClientsList />;
      case "employes":
        return <EmployeList />;
      case "Produit":
        return <ProduitsStockList />;
      case "PV":
        return <PV />;
      case "ventes":
        return <VentesList />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto">
      <NavBar />
      <div className=" bg-white shadow-2xl m-4 rounded-xl jus">
        <TopBoardcentre centreId={idShop} />
      </div>

      <div className=" bg-white shadow-2xl m-4 rounded-xl jus">
        <div className="rounded-xl grid grid-cols-3 place-content-center font-serif text-xl">
          <h1
            onClick={() => setActiveComponent("transferts")}
            className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${
              activeComponent === "transferts" ? "bg-white" : "bg-orange-400"
            }`}
          >
            Liste Transferts
          </h1>
          <h1
            onClick={() => setActiveComponent("clients")}
            className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${
              activeComponent === "clients" ? "bg-white" : "bg-orange-400"
            }`}
          >
            Liste Clients
          </h1>
          <h1
            onClick={() => setActiveComponent("employes")}
            className="shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer"
          >
            Liste Employes
          </h1>
          <h1
            onClick={() => setActiveComponent("Produit")}
            className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${
              activeComponent === "Produit" ? "bg-white" : "bg-orange-400"
            }`}
          >
            Produit
          </h1>
          <h1
            onClick={() => setActiveComponent("ventes")}
            className="shadow-inner py-3 items-center justify-center flex bg-orange-400 hover:bg-white duration-500 cursor-pointer"
          >
            Liste Ventes
          </h1>
          <h1
            onClick={() => setActiveComponent("PV")}
            className={`shadow-inner py-3 items-center justify-center flex hover:bg-white duration-500 cursor-pointer ${
              activeComponent === "PV" ? "bg-white" : "bg-orange-400"
            }`}
          >
            PV
          </h1>
        </div>
        <div>{renderComponent()}</div>
      </div>
      <div className="w-full ">
        <div className="w-full h-full pb-20  bg-gray-300/30 overflow-y-scroll scroll-smooth">
          <div className="flex flex-col w-full lg:flex-row md:items-center">
            <div className="flex flex-col md:w-[65%] rounded-xl m-4  bg-white shadow-2xl">
              <h1 className="text-xl p-6 font-serif">Taux des ventes :</h1>
              <div className="w-full p-4">
                <CentreSalesGraph />
              </div>
            </div>

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
          </div>

          <div className="w-full flex flex-col md:flex-cols lg:flex lg:flex-row"></div>
          {/* chart DIV */}
        </div>
      </div>
    </div>
  );
}

export default Shop;
