// src/components/NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-green-500 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/src/assets/logo.png" alt="ToothFixers Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold">ToothFixers</span>
        </div>
        <ul className="flex space-x-4">
          <li>
          <Link to="/patients/create" className="text-blue-500 hover:underline">Create Patient</Link>
          </li>
          <li>
          <Link to="/patients" className="text-blue-500 hover:underline">View Patients</Link>
          </li>
          <li>
          <Link to="/records/create" className="text-blue-500 hover:underline">Create Clinical Record</Link>
          </li>
          <li>
          <Link to="/records" className="text-blue-500 hover:underline">View Clinical Records</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;