import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import SideBar from "./component/SideBar";
import Produits from "./page/Produits";
import Ventes from "./page/Ventes";
import Achats from "./page/Achats";
import Employe from "./page/Employe";
import Fournisseur from "./page/Fournisseur";
import Client from "./page/Client";
import axios from "axios";
import FirstShop from "./page/FirstShop";
import SecondShop from "./page/SecondShop";
import ThirdShop from "./page/ThirdShop";

function App() {
  function getRequest() {
    axios
      .get("http://localhost:3001/centres")
      .then((response) => {
        console.log("Data:", response.data);
        console.log("Status Code:", response.status);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  getRequest();
  return (
    <div className="h-screen flex overflow-y-hidden">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <SideBar />

                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/Stock" element={<Produits />} />
                  <Route path="/Ventes" element={<Ventes />} />
                  <Route path="/Achats" element={<Achats />} />
                  <Route path="/Employe" element={<Employe />} />
                  <Route path="/Fournisseur" element={<Fournisseur />} />
                  <Route path="/Client" element={<Client />} />
                  <Route path="/FirstShop" element={<FirstShop />} />
                  <Route path="/SecondShop" element={<SecondShop />} />
                  <Route path="/ThirdShop" element={<ThirdShop />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
