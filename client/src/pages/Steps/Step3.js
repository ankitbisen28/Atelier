import React, { useEffect } from 'react';
import { useAppStore } from "../../utils/store";
import { toast } from 'react-toastify'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Step3 = ({ prevStep, formData }) => {

    const { token, setToken, setUserId } = useAppStore((state) => ({
        cart: state.cart,
        token: state.token,
        setToken: state.setToken,
        setUserId: state.setUserId
    }));

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {

            const formDataObj = new FormData();
            formDataObj.append('username', formData.username);
            formDataObj.append('email', formData.email);
            formDataObj.append('password', formData.password);
            formDataObj.append('role', formData.role);
            formDataObj.append('fullName', formData.profile.fullName);
            formDataObj.append('address', formData.profile.address);
            formDataObj.append('phoneNumber', formData.profile.phoneNumber);
            formDataObj.append('country', formData.profile.country);

            if (formData.profile.profilePicture) {
                formDataObj.append('profilePicture', formData.profile.profilePicture);
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/users/register`, formData);
            setToken(response.data.token);
            setUserId(response.data.user)
            toast.success("User Registered");
            navigate('/');
            console.log('Submitting Data:', formData);
        } catch (error) {
            toast.error(`Registration failed: ${error.response.data}`);
            console.error(error);
        }
    };

    useEffect(() => {
        if (token !== null) {
            navigate('/');
        }
    }, [token])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Review and Submit</h2>
            <pre className="bg-gray-100 p-4 rounded mb-4">
                {JSON.stringify(formData, null, 2)}
            </pre>
            <div className="flex justify-between">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={prevStep}
                >
                    Back
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Step3;
