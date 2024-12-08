import React from 'react';

const Step2 = ({ nextStep, prevStep, handleChange, handleFileChange, formData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Profile Information</h2>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          name="profile.fullName"
          className="border rounded p-2 w-full"
          placeholder="Full Name"
          value={formData.profile.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Address</label>
        <input
          type="text"
          name="profile.address"
          className="border rounded p-2 w-full"
          placeholder="Address"
          value={formData.profile.address}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Phone Number</label>
        <input
          type="text"
          name="profile.phoneNumber"
          className="border rounded p-2 w-full"
          placeholder="Phone Number"
          value={formData.profile.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Profile Picture</label>
        <input
          type="file"
          name="profile.profilePicture"
          className="border rounded p-2 w-full"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Country</label>
        <input
          type="text"
          name="profile.country"
          className="border rounded p-2 w-full"
          placeholder="Country"
          value={formData.profile.country}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={prevStep}
        >
          Back
        </button>
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

export default Step2;
