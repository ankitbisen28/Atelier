import React from 'react';

const ProfileCard = ({ consumer }) => {
    return (
        <div className="w-1/2 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-100 p-4">
                <div className="flex items-center">
                    <img
                        className="w-16 h-16 rounded-full border-2 border-white"
                        src="https://via.placeholder.com/150" // replace with the actual image URL
                        alt="Profile"
                    />
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold text-gray-800">{consumer.name}</h2>
                        <p className="text-sm text-gray-600">@bradsteve</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-600">I'm a Front End Developer, follow me to be the first who see my new work.</p>
            </div>
            <div className="bg-gray-100 p-4 flex justify-between">
                <button className="bg-black text-white px-4 py-2 rounded">Follow</button>
                <button className="border border-black text-black px-4 py-2 rounded">View profile</button>
            </div>
        </div>
    );
};

export default ProfileCard;
