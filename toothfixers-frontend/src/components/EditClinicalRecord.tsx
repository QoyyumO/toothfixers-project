import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecord, updateRecord } from '../services/clinicalRecordService';

interface Record {
  id: number;
  clinicDate: string;
  natureOfAilment: string;
  medicinePrescribed: string;
  procedureUndertaken: string;
  dateOfNextAppointment: string;
}

const EditClinicalRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Record>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const data = await getRecord(Number(id));
        setRecord(data);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching record with ID ${id}`);
        setLoading(false);
      }
    };

    if (id) {
      fetchRecordDetails();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateRecord(Number(id), formData);
      navigate(`/records/${id}`);
    } catch (error) {
      setError(`Error updating record with ID ${id}`);
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
      {record ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Edit Clinical Record</h2>
          <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Clinic Date</label>
              <input
                type="date"
                name="clinicDate"
                value={formData.clinicDate?.substring(0, 10) || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nature of Ailment</label>
              <textarea
                name="natureOfAilment"
                value={formData.natureOfAilment || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Medicine Prescribed</label>
              <textarea
                name="medicinePrescribed"
                value={formData.medicinePrescribed || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Procedure Undertaken</label>
              <textarea
                name="procedureUndertaken"
                value={formData.procedureUndertaken || ''}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Next Appointment</label>
              <input
                type="date"
                name="dateOfNextAppointment"
                value={formData.dateOfNextAppointment?.substring(0, 10) || ''}
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
        <div>No record found.</div>
      )}
    </div>
  );
};

export default EditClinicalRecord;
