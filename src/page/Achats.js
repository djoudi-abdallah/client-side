import React, { useState } from "react";
import NavBar from "../component/NavBar";
import { VscActivateBreakpoints, VscTrash, VscEdit } from "react-icons/vsc";
import TopBoard from "../component/TopBoard";
import PurchaseModal from "../component/PurchaeModel";
import axios from "axios";

function Achats() {
  const [achat, setAchat] = useState([]);
  function getRequest() {
    axios
      .get("http://localhost:3001/achats/")
      .then((response) => {
        console.log("Data:", response.data);
        setAchat(response.data);
        console.log("Status Code:", response.status);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getRequest();

  const [isEditing, setIsEditing] = useState(false);

  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditClick = () => {
    console.log("Editing sale:");
  };

  const handleDeleteClick = () => {
    console.log("Deleting sale:");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSavePurchase = (data) => {
    console.log(data); // Traitez les données ici (par exemple, les ajouter à un état global ou les envoyer à un serveur)
    setPurchaseData(data);
    closeModal();
  };

  return (
    <div className="flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30">
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

          {achat.map((achat, index) => (
            <div
              key={index}
              className="grid gap-2 grid-cols-4 md:grid-cols-7 text-center place-content-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center"
            >
              <h1>{achat.productDetails.name}</h1>
              <h1>
                {achat.fournisseurDetails.nom +
                  " " +
                  achat.fournisseurDetails.prenom}
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
                      onClick={handleDeleteClick}
                      className="cursor-pointer text-red-500"
                    />
                    <VscEdit
                      onClick={handleEditClick}
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
