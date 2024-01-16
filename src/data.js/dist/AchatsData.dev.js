"use strict";

var AchatsData = [{
  code: 1001,
  dateAchat: new Date('2023-01-15'),
  id_fournisseur: 1,
  id_produit: 101,
  quantite: 50,
  prixUnitaireHT: 10.5,
  montantTotalHT: 525.0,
  montantVerse: 0,
  soldeRestant: 525.0,
  statutPaiement: 'Non payé'
}, {
  code: 1002,
  dateAchat: new Date('2023-02-20'),
  id_fournisseur: 2,
  id_produit: 102,
  quantite: 30,
  prixUnitaireHT: 8.75,
  montantTotalHT: 262.5,
  montantVerse: 175.0,
  soldeRestant: 87.5,
  statutPaiement: 'Partiellement payé'
}, {
  code: 1003,
  dateAchat: new Date('2023-03-10'),
  id_fournisseur: 3,
  id_produit: 103,
  quantite: 40,
  prixUnitaireHT: 12.0,
  montantTotalHT: 480.0,
  montantVerse: 480.0,
  soldeRestant: 0,
  statutPaiement: 'Entièrement payé'
} // Add more sample data entries as needed
];
module.exports = AchatsData;