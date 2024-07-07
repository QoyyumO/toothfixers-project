import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPatient, getPatient, updatePatient } from '../services/patientService';
import { Patient } from '../types/Patient';

const CreatePatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Patient, 'id'>>({
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: new Date(),
    homeAddress: '',
    dateOfRegistration: new Date(),
    _23120111056: false,
  });

  useEffect(() => {
    if (id) {
      fetchPatient(parseInt(id));
    }
  }, [id]);

  const fetchPatient = async (patientId: number) => {
    try {
      const response = await getPatient(patientId);
      setFormData({
        ...response.data,
        dateOfBirth: response.data.dateOfBirth ? new Date(response.data.dateOfBirth) : new Date(),
        dateOfRegistration: response.data.dateOfRegistration ? new Date(response.data.dateOfRegistration) : new Date(),
      });
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'date') {
      setFormData({
        ...formData,
        [name]: new Date(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePatient(parseInt(id), formData);
      } else {
        await createPatient(formData);
      }
      console.log('Patient created or updated successfully:', formData);
      navigate('/patients');
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-teal-100">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md flex flex-col w-72">
        <h2 className="text-center mb-5 text-teal-700">{id ? 'Update' : 'Create'} Patient</h2>
        <div>
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth ? formData.dateOfBirth.toISOString().substring(0, 10) : ''}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Home Address</label>
          <input
            type="text"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Date of Registration</label>
          <input
            type="date"
            name="dateOfRegistration"
            value={formData.dateOfRegistration ? formData.dateOfRegistration.toISOString().substring(0, 10) : ''}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-4"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="_23120111056"
            checked={formData._23120111056}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm">_23120111056</label>
        </div>
        <button type="submit" className="bg-teal-700 text-white p-2 rounded hover:bg-teal-900">
          {id ? 'Update' : 'Create'} Patient
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
