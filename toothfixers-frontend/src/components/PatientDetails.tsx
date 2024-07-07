import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../services/patientService';

interface Patient {
  id: number;
  firstName: string;
  middleName:string;
  lastName: string;
  dateOfBirth: string;
  homeAddress: string;
  dateOfRegistration: string;
}

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data = await getPatient(Number(id));
        setPatient(data); // Ensure this matches the actual response structure
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
          <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
          <div className="border p-4 rounded-lg">
            <p><strong>Name:</strong> {`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</p>
            <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
            <p><strong>Home Address:</strong> {patient.homeAddress}</p>
            <p><strong>Date of Registration:</strong> {patient.dateOfRegistration}</p>
          </div>
        </>
      ) : (
        <div>No patient found.</div>
      )}
    </div>
  );
};

export default PatientDetails;
