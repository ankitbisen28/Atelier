import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { Carousel } from "react-responsive-carousel";

const ProductPage = () => {
  const { id, HeaderTypeTwo } = useParams();
  const { token } = useContext(UserContext);
  const [product, setProduct] = React.useState({});
  console.log(product)
  const [quantity, setQuantity] = React.useState(1);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/projects/${id}`, {
        headers: HeaderTypeTwo,
      });
      setProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [token]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto mt-16 px-4">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-1/2">
          {product.images && product.images.length > 0 && (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              className="w-full h-[70vh]"
            >
              {product.images.map((image, i) => (
                <div key={i} className="relative w-full h-[70vh]">
                  <img
                    className="object-cover w-full h-full"
                    alt={`image-${i + 1}`}
                    src={image.url}
                  />
                </div>
              ))}
            </Carousel>
          )}

        </div>
        <div className="w-full sm:w-1/2">
          <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span>Category:</span>
            <label>
              <input type="checkbox" value="XS" className="mr-2" />
              XS
            </label>
            <label>
              <input type="checkbox" value="S" className="mr-2" />
              S
            </label>
            <label>
              <input type="checkbox" value="M" className="mr-2" />
              M
            </label>
            <label>
              <input type="checkbox" value="L" className="mr-2" />
              L
            </label>
            <label>
              <input type="checkbox" value="XL" className="mr-2" />
              XL
            </label>
          </div>
          <div className="mb-4">
            <span>Colors:</span>
            <button className="ml-2 mr-2 border px-4 py-2">Black</button>
            <button className="mr-2 border px-4 py-2">White</button>
            <button className="mr-2 border px-4 py-2">Red</button>
            <button className="mr-2 border px-4 py-2">Blue</button>
            <button className="border px-4 py-2">Green</button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button onClick={handleDecrease} className="border p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 012 0v2h6v-2a1 1 0 112 0v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="text-xl">{quantity}</span>
            <button onClick={handleIncrease} className="border p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v4h4a1 1 0 010 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 3.75A1.75 1.75 0 014.75 2h10.5A1.75 1.75 0 0117 3.75V5H3V3.75zM2 6v9.25A1.75 1.75 0 003.75 17h12.5A1.75 1.75 0 0018 15.25V6H2zm9 6a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0111 12zm-6 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H5.75A.75.75 0 015 12zm6-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0111 9zm-6 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H5.75A.75.75 0 015 9zm6-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0111 6zm-6 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H5.75A.75.75 0 015 6z" />
              </svg>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
