import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPatients, deletePatient } from '../services/patientService';

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        
        // Sort patients by ID
        patientsData.patients.sort((a: any, b: any) => a.id - b.id);
        
        // Assign displayId sequentially
        const updatedPatients = patientsData.patients.map((patient: any, index: number) => ({
          ...patient,
          displayId: index + 1,
        }));

        setPatients(updatedPatients); // Assuming 'patients' is the key in the response containing the array of patients
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = () => {
    if (searchId.trim() !== '') {
      navigate(`/patients/${searchId}`);
    }
  };

  const handleDelete = async (patientId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this patient and all their clinical records?");
    if (!confirmed) {
      return;
    }

    try {
      await deletePatient(Number(patientId));
      setPatients(patients.filter(patient => patient.id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Patient ID"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
        <Link
          to="/patients/create"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Create New Patient
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Patients List</h2>
      <div className="space-y-4">
        {patients.map(patient => (
          <div key={patient.id} className="border p-4">
            <div className="flex justify-between items-center mb-2">
              <Link to={`/patients/${patient.id}`}>
                <h3 className="text-xl font-bold">
                  {patient.displayId}. {patient.firstName} {patient.middleName} {patient.lastName}
                </h3>
              </Link>
              <div className="flex space-x-2">
                <Link
                  to={`/patients/${patient.id}/edit`}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <p>Home Address: {patient.homeAddress}</p>
            <p>Date of Registration: {patient.dateOfRegistration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
