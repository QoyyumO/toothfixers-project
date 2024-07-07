import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Layout from './components/Layout';
import CreatePatient from './components/CreatePatients';
import PatientDetails from './components/PatientDetails';
import PatientsList from './components/PatientsList';
import EditPatient from './components/EditPatient';
import CreateRecord from './components/CreateClinicalRecord';
import ClinicalRecordDetails from './components/ClinicalRecordDetails';
import EditClinicalRecord from './components/EditClinicalRecord';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/patients/create" element={<CreatePatient />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/:id/edit" element={<EditPatient />} />
          <Route path="/records/create" element={<CreateRecord />} />
          <Route path="/records" element={<ClinicalRecordDetails />} /> 
          <Route path="/records/:id/edit" element={<EditClinicalRecord />} />
          {/* Ensure these routes are correct */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
