import axios from 'axios';

const API_URL = 'http://localhost:3000'; 


export const getPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  };

export const getRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/records`);
      console.log('Fetched records:', response.data); // Log the records
      return response.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  };

export const getRecord = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/records/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching record with ID ${id}:`, error);
        throw error;
    }
};

export const createRecord = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/records`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating record:', error);
        throw error;
    }
};

export const updateRecord = async (id: number, data: any) => {
    try {
        const response = await axios.patch(`${API_URL}/records/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating record with ID ${id}:`, error);
        throw error;
    }
};

export const deleteRecord = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/records/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting record with ID ${id}:`, error);
        throw error;
    }
};
