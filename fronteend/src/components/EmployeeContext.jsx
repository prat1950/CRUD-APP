// EmployeeContext.js

import { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [emp, setEmployees] = useState([]);

  const updateEmployees = (newEmployee) => {
    console.log('Updating employees:', newEmployee);
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const update = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.fields.employee_id === updatedEmployee.fields.employee_id
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
    <EmployeeContext.Provider value={{ emp, updateEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
