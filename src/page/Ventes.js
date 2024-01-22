import React , {useState , useEffect} from 'react'
import NavBar from '../component/NavBar'
import { FaSearch } from "react-icons/fa";
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from '../component/TopBoard';
import SaleModal from '../component/SaleModel';
import axios from 'axios';




function Ventes() {
   
    
    const [searchType, setSearchType] = useState('client');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [ventes, setVentes] = useState([]);
    const [filteredVentes, setFilteredVentes] = useState(ventes);
    const [currentSale, setCurrentSale] = useState(null);
    
    


useEffect(() => {
  axios.get('http://localhost:3001/ventes/1')
    .then(response => {
      setVentes(response.data);
      setFilteredVentes(response.data);
    })
    .catch(error => {
      console.error('Error fetching ventes:', error);
    });
});



    const handleChangeType = (e) => {
      setSearchType(e.target.value);
      setSearchTerm('');
      setSearchDate('');
    };
  
    const handleChangeTerm = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleChangeDate = (e) => {
      setSearchDate(e.target.value);
    };
  
    const filterVentes = () => {
      setFilteredVentes(
        ventes.filter((vente) => {
          const termMatches = searchType === 'client' || searchType === 'produit'
  ? parseInt(vente[searchType], 10) === parseInt(searchTerm, 10)
  : vente[searchType] && typeof vente[searchType] === 'string'
      ? vente[searchType].toLowerCase().includes(searchTerm.toLowerCase())
      : false;


      const dateMatches = searchDate 
        ? new Date(vente.dateVente).getTime() >= new Date(searchDate).getTime() 
        : true;

      return termMatches && dateMatches;
        })
      );
    };
    const fetchVentes = () => {
      axios.get('http://localhost:3001/ventes/1')
        .then(response => {
          setVentes(response.data);
          setFilteredVentes(response.data);
        })
        .catch(error => {
          console.error('Error fetching ventes:', error);
        });
    };



    const [isEditing, setIsEditing] = useState(false);

    const handleIconClick = () => {
        setIsEditing(!isEditing);
      };

      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSale(null);
      };

      const handleEditClick = (sale) => {
        setCurrentSale(sale);
        setIsModalOpen(true);
      };
    
      const handleDeleteClick = (code) => {
        axios.delete(`http://localhost:3001/ventes/${code}`)
          .then(() => {
         
            fetchVentes();
          })
          .catch(error => {
            console.error('Error deleting vente:', error);
          });
      };
      
      const [isModalOpen, setIsModalOpen] = useState(false);

     
     
      const handleSaveSale = (saleData) => {
        if (currentSale) {
          axios.put(`http://localhost:3001/ventes/${currentSale.code}`, saleData)
            .then(response => {
              fetchVentes();
              closeModal();
            })
            .catch(error => {
              console.error('Error updating vente:', error);
            });
        } else {
          axios.post('http://localhost:3001/ventes', saleData)
            .then(response => {
              setVentes(prevVentes => [...prevVentes, response.data]);
              setFilteredVentes(prevFilteredVentes => [...prevFilteredVentes, response.data]);
              closeModal();
            })
            .catch(error => {
              console.error('Error adding vente:', error);
            });
        }
      };
      
      
      
    
    return (
      <div className=' bg-gray-300/30 w-screen md:w-[77%] lg:w-[80%] overflow-y-scroll  items-center justify-center'>
        <NavBar/>
        <div className='m-2 md:m-4 w-[94%] px-1 md:w-[97%] bg-white rounded shadow-xl flex items-center'>
        <select
  className='mr-2 p-3 w-[4%] md:w-[30%] select-hidden md:select-visible border-none'
  value={searchType}
  onChange={handleChangeType}
>
  <option value='client'>Client</option>
  <option value='produit'>Produit</option>
</select>
          <input
            className='p-3 w-[40%] md:w-[30%] ml-4'
            type='text'
            placeholder={`Search by ${searchType}...`}
            value={searchTerm}
            onChange={handleChangeTerm}
          />
          <input
            className='p-3 w-[18%] sm:w-[30%] ml-4'
            type='date'
            placeholder='Search by Date'
            value={searchDate}
            onChange={handleChangeDate}
          />
          <button className='bg-violet-600 py-2 px-6 rounded text-white ml-2' onClick={filterVentes}>
            <FaSearch />
          </button>
        </div>
  
        <div className='w-[96%] bg-white rounded-xl shadow-xl m-2 md:m-4'>
    {/* Header */}


    <div className='rounded-xl  bg-white shadow-2xl w-full'>
     <TopBoard/>
      <div className='flex justify-between mx-2 items-center'>
      <h2 className="text-xl font-serif p-4 pl-10">Sales Table</h2>
      
      <button
      onClick={() => setIsModalOpen(true)}
        className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
      >
        Add Sale
      </button>
      
      <SaleModal
  isOpen={isModalOpen}
  onClose={closeModal}
  onSave={handleSaveSale}
  saleData={currentSale}
/>
      </div>
      <div className='w-full flex flex-col items-center '>
         <div className='grid gap-2 grid-cols-4 md:grid-cols-7 text-center py-4 place-content-center mx-2  w-full font-serif'>
            <h1>Product</h1>
            <h1>Client</h1>
            <h1 className='hidden md:flex md:justify-center'>Date</h1>
            <h1>Count</h1>
            <h1 className='hidden md:flex md:justify-center'>Total amount</h1>
            <h1 className='hidden md:flex md:justify-center '>Paiment Type</h1>
            <h1>Edit</h1>
         </div>   
    
      {filteredVentes.map((sale , index) =>  (
       <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-7 text-center place-content-center bg-gray-400/30 items-center  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{sale.produitNom}</h1>
         <h1>{sale.clientNom}</h1>
         <h1 className='hidden md:flex md:justify-center'>{new Date(sale.dateVente).toLocaleDateString()}</h1>
         <h1>{sale.prixUnitaire}</h1>
         <h1 className='hidden md:flex md:justify-center'>{sale.quantite}</h1>
         <h1 className='hidden md:flex md:justify-center'>{sale.status}</h1>
     
         <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
           <VscTrash onClick={() => handleDeleteClick(sale.code)} className='cursor-pointer text-red-500'/>
            <VscEdit onClick={() => handleEditClick(sale)} className='cursor-pointer text-blue-500 ml-2'/>
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

export default Ventes
