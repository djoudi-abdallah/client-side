import React, { useState , useEffect } from 'react'
import NavBar from '../component/NavBar'
import TopBoard from '../component/TopBoard'
import PurchaseModal from '../component/PurchaeModel'
import axios from 'axios';
import { VscActivateBreakpoints, VscEdit, VscTrash } from 'react-icons/vsc'
import EditPurchaseModal from '../component/EditPurchaseModal';


function Achats() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achats, setAchats] = useState([]);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

const handleEditClick = (achat) => {
  setSelectedAchat(achat);
  setIsEditModalOpen(true);
};
 

  const handleIconClick = () => {
      setIsEditing(!isEditing);
      
    };
  const handleDeleteClick = ()=>{

    console.log('deleting achat');
  }
  
  const handleSaveEditedAchat = (achatData) => {
    axios
      .put(`http://localhost:3001/achats/${achatData.code}`, achatData)
      .then((response) => {
        console.log("Achat updated:", response.data);
        setIsEditModalOpen(false);
        setSelectedAchat(null);
      })
      .catch((error) => {
        console.error("Error updating achat:", error);
      });
  };
  
  useEffect(() => {
    axios.get("http://localhost:3001/achats")
      .then(response => {
        setAchats(response.data);
        console.log(response.data);

      })
      .catch(error => {
        console.error("Error fetching achats:", error);
      });
  }, []);
  


  const handleSaveAchat = (achatData) => {
    axios.post("http://localhost:3001/achats", achatData)
      .then(response => {
        console.log("Achat added:", response.data);
        setIsModalOpen(false); 
      })
      .catch(error => {
        console.error("Error adding achat:", error);
      });
  };
  
  
 
 
 
  return (
    <div className=' bg-gray-300/30 w-screen md:w-[77%] lg:w-[80%] overflow-y-scroll  items-center justify-center'>
    <NavBar/>
    

    <div className='w-[96%] bg-white rounded-xl shadow-xl m-2 md:m-4'>



<div className='rounded-xl  bg-white shadow-2xl w-full'>
 <TopBoard/>
  <div className='flex justify-between mx-2 items-center'>
  <h2 className="text-xl font-serif p-4 pl-10">Achats Table</h2>
  
  <button
  onClick={() => setIsModalOpen(true)}
    className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
  >
    Add Achat
  </button>
  
  <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAchat}
        />
        {selectedAchat && (
  <EditPurchaseModal
    isOpen={isEditModalOpen}
    onClose={() => {
      setIsEditModalOpen(false);
      setSelectedAchat(null);
    }}
    onSave={handleSaveEditedAchat}
    achatData={selectedAchat}
  />
)}

  </div>
  <div className='w-full flex flex-col items-center '>
     <div className='grid gap-2 grid-cols-4 md:grid-cols-7 text-center py-4 place-content-center mx-2  w-full font-serif'>
        <h1>Fournisseur</h1>
        <h1>Produit</h1>
        <h1 className='hidden md:flex md:justify-center'>Date</h1>
        <h1>Count</h1>
        <h1 className='hidden md:flex md:justify-center'>Prix Unitaire</h1>
        <h1 className='hidden md:flex md:justify-center '>Paiment Type</h1>
        <h1>Edit</h1>
     </div>   

  {achats.map((achat , index) =>  (
   <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-7 text-center place-content-center bg-gray-400/30 items-center  w-[98%] my-2 py-3 rounded-xl justify-center'>
     <h1>{achat
.fournisseurname}</h1>
     <h1>{achat.productDetails.name
}</h1>
     <h1 className='hidden md:flex md:justify-center'>{new Date(achat.dateAchat).toLocaleDateString()}</h1>
     <h1 className='hidden md:flex md:justify-center'>{achat.quantite}</h1>
     <h1>{achat.prixUnitaireHT
}</h1>
     <h1 className='hidden md:flex md:justify-center'>{achat.statusPaiement
}</h1>
 
     <div onClick={handleIconClick} className='flex items-center justify-center'>
    {isEditing ? (
      <>
       <VscTrash onClick={() => handleDeleteClick(achat.code)} className='cursor-pointer text-red-500'/>
        <VscEdit onClick={() => handleEditClick(achat)} className='cursor-pointer text-blue-500 ml-2'/>
      </>
    ) : (
      <VscActivateBreakpoints className='cursor-pointer'/>
    )}
  </div>
  </div>
  ))}</div>
 
</div>



</div>
  </div>
  )
}

export default Achats
