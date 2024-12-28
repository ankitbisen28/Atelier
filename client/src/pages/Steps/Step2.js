import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


const Step2 = ({ nextStep, prevStep, formData }) => {

  const Step2ValidationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    country: Yup.string().required("Country is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData.profile,
    resolver: yupResolver(Step2ValidationSchema),
  });

  const onSubmit = (data) => {
    nextStep({ profile: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Profile Information</h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Full Name</label>
        <input
          {...register("fullName")}
          className="border rounded p-2 w-full"
          placeholder="Full Name"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Phone Number</label>
        <input
          {...register("phoneNumber")}
          className="border rounded p-2 w-full"
          placeholder="Phone Number"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Country</label>
        <input
          {...register("country")}
          className="border rounded p-2 w-full"
          placeholder="Country"
        />
        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Profile Picture</label>
        <input
          {...register("profilePicture")}
          type="file"
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
