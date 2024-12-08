import React from 'react';

const Step1 = ({ nextStep, handleChange, formData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">User Account Details</h2>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Username</label>
        <input
          type="text"
          name="username"
          className="border rounded p-2 w-full"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="border rounded p-2 w-full"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          name="password"
          className="border rounded p-2 w-full"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Role</label>
        <select
          name="role"
          className="border rounded p-2 w-full"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="Consumer">Consumer</option>
          <option value="Maker">Maker</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
