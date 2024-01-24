// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// const EditPurchaseModal = ({ isOpen, onClose, onSave, achatData }) => {
//   const [purchase, setPurchase] = useState(achatData);
//   const [products, setProducts] = useState([]);
//   const [fournisseurs, setFournisseurs] = useState([]);
//   const [centres, setCentres] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       // Remplacer par votre URL de l'API
//       const response = await axios.get('http://localhost:3001/produits/');
//       setProducts(response.data);
//     };
//     const fetchFournisseurs = async () => {
//       // Remplacer par votre URL de l'API
//       const response = await axios.get('http://localhost:3001/fournisseurs/');
//       setFournisseurs(response.data);
//     };
//     const fetchCentres = async () => {
//       // Remplacer par votre URL de l'API
//       const response = await axios.get('http://localhost:3001/centres/');
//       setCentres(response.data);
//     };
//     fetchProducts();
//     fetchFournisseurs();
//     fetchCentres();
//   }, []);
//   useEffect(() => {
//     if (achatData) {
//       setPurchase(achatData);
//     }
//   }, [achatData]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPurchase({ ...purchase, [name]: value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(purchase);
//     onClose();
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
//       <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
//         <form onSubmit={handleSubmit} className="space-y-4 pt-3">
//           <h2 className="text-2xl font-bold">Edit Purchase</h2>
//           {/* Select pour les fournisseurs */}
//           <select
//             name="id_fournisseur"
//             value={purchase.id_fournisseur}
//             onChange={handleChange}
//             className="block w-full p-2 border rounded"
//           >
//             {fournisseurs.map((fournisseur) => (
//               <option key={fournisseur.code} value={fournisseur.code}>
//                 {fournisseur.nom}
//               </option>
//             ))}
//           </select>
//           {/* Select pour les produits */}
//           <select
//             name="id_produit"
//             value={purchase.id_produit}
//             onChange={handleChange}
//             className="block w-full p-2 border rounded"
//           >
//             {products.map((produit) => (
//               <option key={produit.code} value={produit.code}>
//                 {produit.name}
//               </option>
//             ))}
//           </select>
//           {/* Select pour les centres */}
//           <select
//             name="centre"
//             value={purchase.centre}
//             onChange={handleChange}
//             className="block w-full p-2 border rounded"
//           >
//             {centres.map((centre) => (
//               <option key={centre.code} value={centre.code}>
//                 {centre.name}
//               </option>
//             ))}
//           </select>
//           {/* Autres champs du formulaire */}
//           <input
//             type="number"
//             name="quantite"
//             placeholder="Quantité"
//             value={purchase.quantite}
//             onChange={handleChange}
//             className="block w-full p-2 border rounded"
//           />
//           {/* ... Ajoutez d'autres champs si nécessaire */}
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//             Update
//           </button>
//         </form>
//         <button onClick={onClose} className="absolute top-0 right-0 p-4">
//           Fermer
//         </button>
//       </div>
//     </div>
//   );
// };
// export default EditPurchaseModal;
"use strict";