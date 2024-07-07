import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-100">
      <header className="w-full py-4 bg-teal-700 text-white text-center">
        <h1 className="text-3xl font-bold">Welcome to ToothFixers</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <p className="text-lg mb-6">Manage your patients and clinical records with ease.</p>
        <div className="space-y-4">
          <Link to="/patients" className="block w-64 text-center bg-teal-700 text-white py-3 rounded-lg shadow hover:bg-teal-800">
            Manage Patients
          </Link>
          <Link to="/records" className="block w-64 text-center bg-teal-700 text-white py-3 rounded-lg shadow hover:bg-teal-800">
            View Clinical Records
          </Link>
          <Link to="/patients/create" className="block w-64 text-center bg-teal-700 text-white py-3 rounded-lg shadow hover:bg-teal-800">
            Add New Patient
          </Link>
          <Link to="/records/create" className="block w-64 text-center bg-teal-700 text-white py-3 rounded-lg shadow hover:bg-teal-800">
            Add New Clinical Record
          </Link>
        </div>
      </main>
      <footer className="w-full py-4 bg-teal-700 text-white text-center">
        <p>&copy; 2024 ToothFixers. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
