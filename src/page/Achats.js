import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import { VscActivateBreakpoints, VscTrash, VscEdit } from "react-icons/vsc";
import TopBoard from "../component/TopBoard";
import PurchaseModal from "../component/PurchaeModel";
import axios from "axios";

function Achats() {
  const [achat, setAchat] = useState([]);
  const [currentAchat, setCurrentAchat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch achats when the component is mounted
    getRequest();
  }, []);

  const getRequest = async () => {
    try {
      const response = await axios.get("http://localhost:3001/achats/");
      setAchat(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditClick = (achat) => {

    setCurrentAchat(achat); // Set the current achat to the one you want to edit

    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDeleteClick = async (code) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`http://localhost:3001/achats/${code}`);
      // If successful, remove the item from the state
      const updatedAchats = achat.filter((achat) => achat.code !== code);
      setAchat(updatedAchats);
    } catch (error) {
      console.error("Failed to delete the item:", error);
      // Handle the error, maybe notify the user
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const fetchAchats = () => {
    axios
      .get("http://localhost:3001/achats")
      .then((response) => {
        setAchat(response.data);
      })
      .catch((error) => {
        console.error("Error fetching achats", error);
      });
  };

  useEffect(() => {
    fetchAchats();
  }, );

  const handleSavePurchase = (achatData) => {
    if (currentAchat) {
      console.log(currentAchat);
      axios
        .put(`http://localhost:3001/achats/${currentAchat.code}`, achatData)
        .then((response) => {
          fetchAchats();
        })
        .catch((error) => {
          console.error("Error updating Achat:", error);
        });
    } else {
     
      axios
        .post("http://localhost:3001/achats", achatData)
        .then((response) => {
          fetchAchats();
        })
        .catch((error) => {
          console.error("Error adding Achat:", error);
        });
    }
    closeModal();
  };

  return (
    <div className="flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto">
      <NavBar />
      <div className="rounded-xl  bg-white shadow-2xl m-4">
        <TopBoard />
        <div className="flex justify-between mx-2 items-center">
          <h2 className="text-xl font-serif p-4 pl-10">purchases Table</h2>
          <button
            onClick={openModal}
            className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
          >
            Add Purchase
          </button>
          <PurchaseModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSavePurchase}
            achatData={currentAchat}
          />

        </div>
        <div className="w-full flex flex-col items-center">
          <div className="grid gap-2 grid-cols-4 md:grid-cols-7 text-center py-4 place-content-center w-full font-serif">
            <h1>Product</h1>
            <h1>Fournisser</h1>
            <h1 className="hidden md:flex md:justify-center">Date</h1>
            <h1>Price</h1>
            <h1 className="hidden md:flex md:justify-center">Count</h1>
            <h1 className="hidden md:flex md:justify-center">Total amount</h1>
            <h1>Edit</h1>
          </div>

          {achat.map((achat) => (
            <div
              key={achat.code}
              className="grid gap-2 grid-cols-4 md:grid-cols-7 text-center place-content-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center"
            >
              <h1>{achat.productDetails.name}</h1>
              <h1>
                {achat.fournisseurname} {achat.fournisseurprenom}
              </h1>
              <h1 className="hidden md:flex md:justify-center">
                {new Date(achat.dateAchat).toLocaleDateString()}
              </h1>
              <h1>{achat.prixUnitaireHT}</h1>
              <h1 className="hidden md:flex md:justify-center">
                {achat.quantite}
              </h1>
              <h1 className="hidden md:flex md:justify-center">
                {achat.montantTotalHT}
              </h1>

              <div
                onClick={handleIconClick}
                className="flex items-center justify-center"
              >
                {isEditing ? (
                  <>
                    <VscTrash
                      onClick={() => handleDeleteClick(achat.code)}
                      className="cursor-pointer text-red-500"
                    />
                    <VscEdit
                      onClick={() => handleEditClick(achat)}
                      className="cursor-pointer text-blue-500 ml-2"
                    />
                  </>
                ) : (
                  <VscActivateBreakpoints className="cursor-pointer" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achats;
