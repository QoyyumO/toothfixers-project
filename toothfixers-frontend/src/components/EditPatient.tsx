import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, updatePatient } from '../services/patientService';

interface Patient {
  id: number;
  firstName: string;
  middleName:string;
  lastName: string;
  dateOfBirth: string;
  homeAddress: string;
  dateOfRegistration: string;
}

const EditPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data = await getPatient(Number(id));
        console.log("Fetched patient data:", data); // Log API response
        setPatient(data); // Ensure this matches the response structure
        setFormData(data); // Ensure this matches the response structure
        setLoading(false);
      } catch (error) {
        setError(`Error fetching patient with ID ${id}`);
        setLoading(false);
      }
    };

    if (id) {
      fetchPatientDetails();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePatient(Number(id), formData);
      navigate(`/patients/${id}`);
    } catch (error) {
      setError(`Error updating patient with ID ${id}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {patient ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Edit Patient Details</h2>
          <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Midlle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth?.substring(0, 10) || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Home Address</label>
              <input
                type="text"
                name="homeAddress"
                value={formData.homeAddress || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Registration</label>
              <input
                type="date"
                name="dateOfRegistration"
                value={formData.dateOfRegistration?.substring(0, 10) || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Save
            </button>
          </form>
        </>
      ) : (
        <div>No patient found.</div>
      )}
    </div>
  );
};

export default EditPatient;
