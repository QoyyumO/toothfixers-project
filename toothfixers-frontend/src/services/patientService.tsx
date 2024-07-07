    import axios from 'axios';

    const API_URL = 'http://localhost:3000'; // Replace with your actual backend API URL

    export const getPatients = async () => {
        try {
        const response = await axios.get(`${API_URL}/patients`);
        return response.data;
        } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
        }
    };
    
    export const getPatient = async (id: number) => {
        try {
          const response = await axios.get(`${API_URL}/patients/${id}`);
          return response.data.patient; // Ensure this returns { patient: {...} }
        } catch (error) {
          console.error(`Error fetching patient with ID ${id}:`, error);
          throw error;
        }
      };

    export const createPatient = async (patientData: any) => {
    try {
        const response = await axios.post(`${API_URL}/patients`, patientData);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
    };

    export const updatePatient = async (id: number, patientData: any) => {
        try {
          const response = await axios.put(`${API_URL}/patients/${id}`, patientData);
          return response.data;
        } catch (error) {
          console.error(`Error updating patient with ID ${id}:`, error);
          throw error;
        }
      };
      

    export const deletePatient = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/patients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting patient with ID ${id}:`, error);
        throw error;
    }
    };
