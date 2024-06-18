import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { Carousel } from "react-responsive-carousel";
import { RiMailSendFill } from "react-icons/ri";
import { useFormik } from "formik";
import { useAppStore } from '../utils/store';
import { toast } from 'react-toastify';

const ProjectPage = () => {
  const { id, HeaderTypeTwo } = useParams();
  const { token } = useContext(UserContext);
  const [product, setProduct] = React.useState({});
  const { userId } = useAppStore((state) => ({ userId: state.userId }));

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

  const initialValues = {
    bidderId: userId,
    amount: "",
    message: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URI}/api/v1/projects/bid/${product._id}`,
            values
          );
          toast.success(`Proposal Submitted`);
          action.resetForm();
        } catch (error) {
          toast.error(`Submit Failed: ${error.response.data.message}`);
        }
      },
    });

  useEffect(() => {
    getProductDetail();
  }, [token]);

  return (
    <>
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
            <h1 className="text-4xl font-semibold mb-4">{product.title}</h1>
            <p className="text-xl mb-4">${product.budget}</p>
            <p className="mb-4">{product.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2" onClick={() => document.getElementById('my_modal_1').showModal()}>
                <RiMailSendFill />
                Make Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg text-center p-3">Make your Proposal</h3>
            <label className="block text-white p-3">Amount</label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              type="number"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="block text-white p-3">Massage</label>
            <textarea name='message' value={values.message} onChange={handleChange} onBlur={handleBlur} rows='6' cols="60">
            </textarea>
            <div className="modal-action">
              <button className='p-3' type='submit'>
                Apply
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ProjectPage;
