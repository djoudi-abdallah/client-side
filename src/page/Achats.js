import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import TopBoard from "../component/TopBoard";
import AddPurchaseModal from "../component/AddPurchaseModal";
import EditPurchaseModal from "../component/EditPurchaseModal";
import axios from "axios";
import { VscTrash, VscEdit } from "react-icons/vsc";

function Achats() {
  const [achats, setAchats] = useState([]);
  const [currentAchat, setCurrentAchat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchAchats();
  }, []);

  const fetchAchats = async () => {
    try {
      const response = await axios.get("http://localhost:3001/achats/");
      setAchats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  const handleEditClick = (achat) => {
    setCurrentAchat(achat);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (code) => {
    try {
      await axios.delete(`http://localhost:3001/achats/${code}`);
      fetchAchats(); 
    } catch (error) {
      console.error("Failed to delete the item:", error);
    }
  };

  const handleAddAchat = (achatData) => {
    axios
      .post("http://localhost:3001/achats", achatData)
      .then(() => {
        fetchAchats();
        setIsAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding Achat:", error);
      });
  };

  const handleEditAchat = (achatData) => {
    axios
      .put(`http://localhost:3001/achats/${currentAchat.code}`, achatData)
      .then(() => {
        fetchAchats();
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating Achat:", error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 
return (
  <div className="flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto">
    <NavBar />
    <div className="rounded-xl bg-white shadow-2xl m-4">
      <TopBoard />
      {/* ... */}
<div className="flex justify-between mx-2 items-center">
  <h2 className="text-xl font-serif p-4 pl-10">Purchases Table</h2>
  <button
    onClick={() => setIsAddModalOpen(true)}
    className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
  >
    Add Purchase
  </button>
</div>

<AddPurchaseModal
  isOpen={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  onSave={handleAddAchat}
/>

<EditPurchaseModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  onSave={handleEditAchat}
  achatData={currentAchat}
/>

      <div className="w-full flex flex-col items-center">
        <div className="grid gap-2 grid-cols-4 md:grid-cols-7 text-center py-4 place-content-center w-full font-serif">
          <h1>Product</h1>
          <h1>Fournisseur</h1>
          <h1 className="hidden md:flex md:justify-center">Date</h1>
          <h1>Price</h1>
          <h1 className="hidden md:flex md:justify-center">Count</h1>
          <h1 className="hidden md:flex md:justify-center">Total amount</h1>
          <h1>Edit</h1>
        </div>
        {achats.map((achat) => (
          <div
            key={achat.code}
            className="grid gap-2 grid-cols-4 md:grid-cols-7 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center"
          >
            <h1>{achat.productDetails.name}</h1>
            <h1>{achat.fournisseur.nom}</h1>
            <h1 className="hidden md:flex md:justify-center">
              {new Date(achat.dateAchat).toLocaleDateString()}
            </h1>
            <h1>{achat.prixUnitaireHT}</h1>
            <h1 className="hidden md:flex md:justify-center">{achat.quantite}</h1>
            <h1 className="hidden md:flex md:justify-center">{achat.montantTotalHT}</h1>
            <div className="flex items-center justify-center">
              <VscEdit
                onClick={() => handleEditClick(achat)}
                className="cursor-pointer text-blue-500"
              />
              <VscTrash
                onClick={() => handleDeleteClick(achat.code)}
                className="cursor-pointer text-red-500 ml-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
export default Achats;

