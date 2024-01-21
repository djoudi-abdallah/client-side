import React , {useState , useEffect} from 'react'
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import axios from 'axios';
import { useSearchParams, useLocation } from 'react-router-dom';




function EmployeList() {
 
 
 
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");

  
  
  const [isEditing, setIsEditing] = useState(false);

    const handleIconClick = () => {
        setIsEditing(!isEditing);
      };

  
     

const handleDeleteClick = (code) => {
  axios.delete(`http://localhost:3001/employes/${code}`)
  .then(response => {
    fetchEmployes(); 
  })
  .catch(error => {
    console.error('Error deleting employe:', error);
    
  });
  };
  
  
  const fetchEmployes = () => {
    axios.get(`http://localhost:3001/employes/${idShop}`)
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Error fetching employes:', error);
      });
  };

  useEffect(() => {
    fetchEmployes();
  });

 

  return (
    <div className='flex flex-col w-full  bg-gray-300/30 overflow-auto' >
    
    <div className='  bg-white shadow-2xl '>
  
   <div className='flex justify-between mx-2 items-center'>
   
     <h2 className="text-xl font-serif p-4 pl-10">Employe Table</h2>
   
    </div>
    <div className='w-full flex flex-col items-center'>
       <div className='grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6  text-center py-4 place-content-center w-full font-serif'>
          <h1>Full Name</h1>
          <h1>Adresse</h1>
          <h1 className='hidden md:flex md:justify-center'>Phone Number</h1>
          <h1 className='hidden md:flex md:justify-center'>salaire/jour</h1>
          <h1 >salaire</h1>
          <h1>Edit</h1>
       </div>   
  
    {employes.map((emp , index) =>  (
     <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6  text-center place-content-center items-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
       <h1>{emp.nom }{emp.prenom}</h1>
       <h1>{emp.adresse}</h1>
       <h1 className='hidden md:flex md:justify-center'>{emp.telephone}</h1>
       <h1>{emp.salaire_jour}</h1>
       <h1>{emp.salaire}</h1>
       
   
       <div onClick={handleIconClick} className='flex items-center justify-center'>
      {isEditing ? (
        <>
         <VscTrash onClick={() => handleDeleteClick(emp.code)} className='cursor-pointer text-red-500'/>
         
        </>
      ) : (
        <VscActivateBreakpoints className='cursor-pointer'/>
      )}
    </div>
    </div>
    ))}</div>
   
  </div>
  
  </div>
  )
}

export default EmployeList;
