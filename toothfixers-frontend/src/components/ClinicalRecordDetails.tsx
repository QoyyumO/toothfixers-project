import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecords, deleteRecord } from '../services/clinicalRecordService';

const ClinicalRecordDetails: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsData = await getRecords();
        console.log('Fetched records:', recordsData); // Log the records

        // Sort records by ID
        recordsData.sort((a: any, b: any) => a.id - b.id);

        // Assign displayId sequentially
        const updatedRecords = recordsData.map((record: any, index: number) => ({
          ...record,
          displayId: index + 1,
        }));

        setRecords(updatedRecords);
      } catch (error) {
        console.error('Error fetching records:', error);
        setError('Error fetching records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleDelete = async (recordId: number) => {
    try {
      await deleteRecord(recordId);
      setRecords(records.filter(record => record.id !== recordId));
    } catch (error) {
      console.error('Error deleting record:', error);
      setError('Error deleting record. Please try again later.');
    }
  };

  const filteredRecords = records.filter(record =>
    record.patient && `${record.patient.firstName} ${record.patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Patient Name"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <Link
          to="/records/create"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Create New Record
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Records List</h2>
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map(record => (
            <div key={record.id} className="border p-4">
              <div className="flex justify-between items-center mb-2">
                <Link to={`/records/${record.id}`}>
                  <h3 className="text-xl font-bold">
                    Record ID: {record.displayId} - Patient: {record.patient ? `${record.patient.firstName} ${record.patient.lastName}` : 'Unknown'}
                  </h3>
                </Link>
                <div className="flex space-x-2">
                  <Link
                    to={`/records/${record.id}/edit`}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p>Clinic Date: {record.clinicDate}</p>
              <p>Nature of Ailment: {record.natureOfAilment}</p>
              <p>Medicine Prescribed: {record.medicinePrescribed}</p>
              <p>Procedure Undertaken: {record.procedureUndertaken}</p>
              <p>Date of Next Appointment: {record.dateOfNextAppointment}</p>
            </div>
          ))
        ) : (
          <div>No records found.</div>
        )}
      </div>
    </div>
  );
};

export default ClinicalRecordDetails;
