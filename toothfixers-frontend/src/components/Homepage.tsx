import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to ToothFixers</h1>
            <div className="space-x-4">
                <Link to="/patients/create" className="text-blue-500 hover:underline">Create Patient</Link>
                <Link to="/patients" className="text-blue-500 hover:underline">View Patients</Link>
                <Link to="/clinical-records/create" className="text-blue-500 hover:underline">Create Clinical Record</Link>
                <Link to="/clinical-records" className="text-blue-500 hover:underline">View Clinical Records</Link>
            </div>
        </div>
    );
};

export default Homepage;
