// App.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee'; // Import the CreateEmployee component

const App = () => {
  return (
    <Container>
      <Typography variant="h1">Employee List</Typography>
      <EmployeeList />
      <CreateEmployee /> {/* Add the CreateEmployee component here */}
    </Container>
  );
};

export default App;
