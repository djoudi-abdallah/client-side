import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../component/NavBar';
import AddProductModal from '../component/AddProductModal';
import EditProductModal from '../component/EditProductModal';
import { FaSearch } from 'react-icons/fa';
import TopBoard from '../component/TopBoard';
import { VscTrash, VscEdit } from 'react-icons/vsc';

function Produits() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProducts = () => {
    axios.get('http://localhost:3001/produits')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const filteredProducts = products.filter(prd =>
    prd.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (code) => {
    axios
      .delete(`http://localhost:3001/produits/${code}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleSaveProduct = (productData) => {
    if (currentProduct) {
      axios
        .put(`http://localhost:3001/produits/${currentProduct.code}`, productData)
        .then(() => {
          fetchProducts();
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    } else {
      axios
        .post('http://localhost:3001/produits', productData)
        .then(() => {
          fetchProducts();
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <div className='bg-gray-300/30 w-full md:w-[77%] lg:w-[82%] overflow-y-auto'>
      <NavBar />
      <div className='flex items-center'>
        <div className='w-full mr-2'>
          <div className='m-4 w-[97%]'>
            <div className='flex items-center'> 
              <div className='m-4 w-[85%] px-1 bg-white rounded shadow-xl flex items-center'>
                <input
                  className='p-3 w-[96%] border-none'
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleChange}
                />
                <FaSearch />
              </div>
              <div className=''>
                <button
                  className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </div>
            </div>
            <div className='bg-white w-full rounded-xl shadow-2xl'>
              <TopBoard />
              <h2 className="text-xl font-serif px-10 py-6">Sales Table :</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='grid gap-2 grid-cols-5 text-center py-4 place-content-center w-full font-serif'>
                  <h1>Code</h1>
                  <h1>Name</h1>
                  <h1>Status</h1>
                  <h1>Price</h1>
                  <h1>Edit</h1>
                </div>   
                {filteredProducts.map((prd, index) => (
                  <div key={index} className='grid gap-2 grid-cols-5 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
                    <h1>{prd.code}</h1>
                    <h1>{prd.name}</h1>
                    <h1>{prd.status}</h1>
                    <h1>{prd.price}</h1>
                    <div className='flex items-center justify-center'>
                      <VscTrash onClick={() => handleDeleteProduct(prd.code)} className='cursor-pointer text-red-500' />
                      <VscEdit onClick={() => handleEditProduct(prd)} className='cursor-pointer text-blue-500 ml-2' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveProduct}
      />
       {currentProduct && (
        <EditProductModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProduct}
          productData={currentProduct}
        />
      )}
    </div>
  );
};

export default Produits;
