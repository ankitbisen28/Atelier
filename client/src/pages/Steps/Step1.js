import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


const Step1 = ({ nextStep, formData }) => {
  const Step1ValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().oneOf(["Consumer", "Maker"]).required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(Step1ValidationSchema),
  });

  const onSubmit = (data) => nextStep(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">User Account Details</h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Username</label>
        <input
          {...register("username")}
          className="border rounded p-2 w-full"
          placeholder="Username"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          {...register("email")}
          className="border rounded p-2 w-full"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          {...register("password")}
          type="password"
          className="border rounded p-2 w-full"
          placeholder="Password"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Role</label>
        <select {...register("role")} className="border rounded p-2 w-full">
          <option value="Consumer">Consumer</option>
          <option value="Maker">Maker</option>
        </select>
      </div>

      <div className="flex justify-between">
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

export default Step1;
