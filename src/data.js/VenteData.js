// data.js

const generateRandomDate = () => {
    const startDate = new Date(2022, 0, 1); // January 1, 2022
    const endDate = new Date(); // Current date
  
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate;
  };
  
  const ventesData = [
    {
      dateVente: generateRandomDate(),
      client: 'Client001', // Replace with the actual ObjectId of a client
      produit: 'Produit001', // Replace with the actual ObjectId of a product
      quantite: 5,
      prixUnitaire: 10.0,
    },
    {
      dateVente: generateRandomDate(),
      client: 'Client002', // Replace with the actual ObjectId of a client
      produit: 'Produit002', // Replace with the actual ObjectId of a product
      quantite: 3,
      prixUnitaire: 8.0,
    },
    {
      dateVente: generateRandomDate(),
      client: 'Client003', // Replace with the actual ObjectId of a client
      produit: 'Produit003', // Replace with the actual ObjectId of a product
      quantite: 7,
      prixUnitaire: 12.0,
    },
    {
      dateVente: generateRandomDate(),
      client: 'Client003', // Replace with the actual ObjectId of a client
      produit: 'Produit003', // Replace with the actual ObjectId of a product
      quantite: 7,
      prixUnitaire: 12.0,
    },
    {
      dateVente: generateRandomDate(),
      client: 'Client003', // Replace with the actual ObjectId of a client
      produit: 'Produit003', // Replace with the actual ObjectId of a product
      quantite: 7,
      prixUnitaire: 12.0,
    },
    {
      dateVente: generateRandomDate(),
      client: 'Client003', // Replace with the actual ObjectId of a client
      produit: 'Produit003', // Replace with the actual ObjectId of a product
      quantite: 7,
      prixUnitaire: 12.0,
    },
    // Add more objects as needed
  ];
  
  module.exports = ventesData;
  