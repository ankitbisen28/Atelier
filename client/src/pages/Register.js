import React, { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Consumer",
    profile: {
      fullName: "",
      address: "",
      phoneNumber: "",
      profilePicture: null,
      country: "",
    },
  });

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {step === 1 && <Step1 nextStep={nextStep} formData={formData} />}
        {step === 2 && (
          <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} />
        )}
        {step === 3 && <Step3 prevStep={prevStep} formData={formData} />}
      </div>
    </div>
  );
};

export default Register;
