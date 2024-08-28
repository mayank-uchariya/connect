import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-r from-blue-500 to-purple-600">
      <main className="flex-1 bg-gray-50 p-8 md:p-12 lg:p-16 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to SocialApp</h1>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900">Your Feed</h2>
            <p className="mt-4 text-gray-700">Latest posts from your network...</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900">What's happening</h2>
            <p className="mt-4 text-gray-700">News, updates, and more...</p>
          </div>
          {/* Add more content to demonstrate scrolling */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900">Explore</h2>
            <p className="mt-4 text-gray-700">Discover new topics and communities...</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
            <p className="mt-4 text-gray-700">You have new notifications...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
