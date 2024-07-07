import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecord, getPatients } from '../services/clinicalRecordService';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

const CreateRecord: React.FC = () => {
  const [record, setRecord] = useState({
    patientId: '',
    clinicDate: '',
    natureOfAilment: '',
    medicinePrescribed: '',
    procedureUndertaken: '',
    dateOfNextAppointment: '',
  });
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        console.log('Patients data:', patientsData); // Log the data received
        if (patientsData && patientsData.patients && Array.isArray(patientsData.patients)) {
          setPatients(patientsData.patients);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to fetch patients. Please try again.');
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRecord(record);
      navigate('/records'); // Redirect to records list or another appropriate page
    } catch (error) {
      console.error('Failed to create clinical record', error);
      setError('Failed to create clinical record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-teal-100">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md flex flex-col w-72">
        <h2 className="text-center mb-5 text-teal-700">Create Clinical Record</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div>
          <label className="block mb-2">Patient</label>
          <select
            name="patientId"
            value={record.patientId}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded mb-4"
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Clinic Date</label>
          <input
            type="date"
            name="clinicDate"
            value={record.clinicDate}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Nature of Ailment</label>
          <input
            type="text"
            name="natureOfAilment"
            value={record.natureOfAilment}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Medicine Prescribed</label>
          <input
            type="text"
            name="medicinePrescribed"
            value={record.medicinePrescribed}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Procedure Undertaken</label>
          <input
            type="text"
            name="procedureUndertaken"
            value={record.procedureUndertaken}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Date of Next Appointment</label>
          <input
            type="date"
            name="dateOfNextAppointment"
            value={record.dateOfNextAppointment}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <button type="submit" className="bg-teal-700 text-white p-2 rounded hover:bg-teal-900" disabled={loading}>
          {loading ? 'Creating...' : 'Create Clinical Record'}
        </button>
      </form>
    </div>
  );
};

export default CreateRecord;
