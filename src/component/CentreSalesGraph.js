import React, { useState, useEffect } from "react";
import Graphe from "./Graphe"; // Adjust the path to your Graphe component
import axios from "axios";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";

const CentreSalesGraph = () => {
  const [salesData, setSalesData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/dashbord/profit/${idShop}`)
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des produits les plus vendus",
          error
        );
      });
  }, [idShop]);

  return <Graphe data={salesData} />;
};

export default CentreSalesGraph;
