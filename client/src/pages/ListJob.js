import React, { useState } from 'react';

const JobListings = () => {
  const [selectedTab, setSelectedTab] = useState('Best Matches'); 

  const jobs = {
    'Best Matches': [
      {
        id: 1,
        title: 'Fix my Node js api and add JWT',
        description: 'I have a node js project, you need to setup it on different port and add JWT with custom expiry. Also add CORS to allow request from local.',
        budget: '$10',
        proposals: '20 to 50',
        location: 'India',
        timePosted: '4 hours ago',
      },
    ],
    'Most Recent': [
      {
        id: 2,
        title: 'Recent Job 1',
        description: 'This is a recent job description.',
        budget: '$20',
        proposals: '10 to 20',
        location: 'USA',
        timePosted: '2 hours ago',
      },
    ],
    'Saved Jobs': [
      {
        id: 3,
        title: 'Saved Job 1',
        description: 'This is a saved job description.',
        budget: '$15',
        proposals: '5 to 10',
        location: 'UK',
        timePosted: '1 day ago',
      },
    ],
  };

  return (
    <div className="conainer p-4">
      <div className="flex space-x-4 mb-4">
        {['Best Matches', 'Most Recent', 'Saved Jobs'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${selectedTab === tab
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {jobs[selectedTab].map((job) => (
          <div key={job.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-700">{job.description}</p>
            <p className="text-gray-500">Budget: {job.budget}</p>
            <p className="text-gray-500">Proposals: {job.proposals}</p>
            <p className="text-gray-500">Location: {job.location}</p>
            <p className="text-gray-500">Posted: {job.timePosted}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;

