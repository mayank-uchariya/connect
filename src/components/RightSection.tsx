import { FC } from 'react';
import { FaTag, FaUserPlus } from 'react-icons/fa';

const RightSection: FC = () => {
  return (
    <aside className="bg-white h-screen p-6 w-72 flex flex-col space-y-6 shadow-lg max-xl:hidden font-['RL_DroidKufi','Founders Grotesk Mono Regular','Arial','Helvetica','sans-serif']">
      
      {/* Trending Topics Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center space-x-2">
          <FaTag className="text-2xl text-gray-600" />
          <span>Trending Topics</span>
        </h2>
        <ul className="space-y-3">
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">#Nextjs</span>
          </li>
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">#React</span>
          </li>
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">#TailwindCSS</span>
          </li>
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">#JavaScript</span>
          </li>
        </ul>
      </div>
      
      {/* Friend Suggestions Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center space-x-2">
          <FaUserPlus className="text-2xl text-gray-600" />
          <span>Friend Suggestions</span>
        </h2>
        <ul className="space-y-3">
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">John Doe</span>
            <button className="text-blue-500 hover:text-blue-700 font-semibold">Add</button>
          </li>
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Jane Smith</span>
            <button className="text-blue-500 hover:text-blue-700 font-semibold">Add</button>
          </li>
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Emily Johnson</span>
            <button className="text-blue-500 hover:text-blue-700 font-semibold">Add</button>
          </li>
          <li className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-300 transition-colors flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Michael Brown</span>
            <button className="text-blue-500 hover:text-blue-700 font-semibold">Add</button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RightSection;
