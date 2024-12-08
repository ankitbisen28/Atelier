import React, { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Consumer',
    profile: {
      fullName: '',
      address: '',
      phoneNumber: '',
      profilePicture: null,
      country: '',
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [profileField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        profilePicture: e.target.files[0],
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} formData={formData} />}
        {step === 2 && (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            formData={formData}
          />
        )}
        {step === 3 && <Step3 prevStep={prevStep} formData={formData} />}
      </div>
    </div>
  );
};

export default Register;
