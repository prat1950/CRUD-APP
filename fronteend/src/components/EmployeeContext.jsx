// EmployeeContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [emp, setEmployees] = useState([]);

  const updateEmployees = (newEmployee) => {
    console.log('Updating employees:', newEmployee);
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const update = (updatedEmployee) => {
    // Extract relevant fields from updatedEmployee
    const { fields } = updatedEmployee;
    console.log('Payload:', fields);
  
    // Send a PUT request to update the employee on the server
    axios.put(`http://localhost:8000/api/employee_update/${fields.employee_id}/`, fields)
      .then(response => {
        console.log('Employee updated on the server:', response.data);
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  
    // Update the local state
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.fields.employee_id === fields.employee_id
          ? updatedEmployee
          : employee
      )
    );
  };
  
  
  

  const deleteEmployee = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.fields.employee_id !== employeeId)
    );
  };

  return (
    <EmployeeContext.Provider value={{ emp, updateEmployees, update, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
