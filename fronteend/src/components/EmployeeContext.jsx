// EmployeeContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [emp, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    employee_id: '',
    employee_code: '',
    dob: '',
    designation: '',
    gender: '',
    programming_skills: [],
    language_skills: [],
    programming_skills_level: '',
    language_skills_level: '',
  });

  const setForm = (updatedFields) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...updatedFields,
    }));
  };

  const updateEmployees = (newEmployee) => {
    console.log('Updating employees:', newEmployee);
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const update = (updatedEmployee) => {
    // Extract relevant fields from updatedEmployee
    const { fields } = updatedEmployee;
    if (!fields) {
      console.error('Error: "fields" is undefined in updatedEmployee:', updatedEmployee);
      return;
    }
    console.log('Payload:', fields);
    const payload = {
      ...fields,
      programming_skills: fields.programming_skills || [],
      programming_skills_level: fields.programming_skills_level || '',
      language_skills: fields.language_skills || [],
      language_skills_level: fields.language_skills_level || '',
  };


  
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

    setSelectedEmployee(null);
  };
  
  const reset = () => {
    setFormData({
      employee_id: '',
      employee_code: '',
      dob: '',
      designation: '',
      gender: '',
      programming_skills: [],
      language_skills: [],
      programming_skills_level: '',
      language_skills_level: '',
    });
  };
  

  const deleteEmployee = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.fields.employee_id !== employeeId)
    );
  };

  return (
    <EmployeeContext.Provider value={{ emp, updateEmployees, update, deleteEmployee, selectedEmployee, setSelectedEmployee, reset }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
