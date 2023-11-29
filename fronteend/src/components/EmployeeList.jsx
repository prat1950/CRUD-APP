import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import WcIcon from '@mui/icons-material/Wc';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import { useEmployeeContext } from './EmployeeContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // You can replace this with an appropriate icon for programming language skills level
import LanguageLevelIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import FilterListIcon from '@mui/icons-material/FilterList';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [choices, setChoices] = useState({});
  const [fetchDataFlag, setFetchDataFlag] = useState(true);

  const { emp, update, deleteEmployee } = useEmployeeContext();

  useEffect(() => {
    fetchData();
  }, [emp]);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/employee_list/')
      .then(response => {
        const decodedData = JSON.parse(response.data.data);
        setEmployees(decodedData);
        setChoices(response.data.choices);
        console.log('Decoded Data:', decodedData);
        console.log('Choices:', response.data.choices);
      })
      .catch(error => console.error(error));
  };

  const handleUpdate = (employee) => {
    // This function should be used in the CreateEmployee component to pre-fill the form with existing data
    update(employee);
    // Now you can navigate to the CreateEmployee component or open a modal for editing
    
    
  };

  const handleDelete = (employeeId) => {
    //deleting by ID
    deleteEmployee(employeeId);

    //sends a delete call 
    axios.delete(`http://localhost:8000/api/employee_delete/${employeeId}`)
      .then(response => {
        console.log('Employee deleted successfully:', response.data);
        // Trigger a refetch of the data after deletion
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <Grid container spacing={2} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
      {employees.map(employee => (
        <Grid item key={employee.fields.employee_id} xs={12} sm={6} md={4} lg={3}>
          <Card variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={`Employee ID: ${employee.fields.employee_id}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary={`Designation: ${employee.fields.designation}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
                <ListItemText primary={`Gender: ${choices.gender_choices[employee.fields.gender]}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText primary={`Date of Birth: ${employee.fields.dob}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary={`Programming Skills: ${employee.fields.programming_skills.join(', ')}`} />
              </ListItem>
              <ListItem>
              <ListItemIcon>
              <FilterListIcon />
                </ListItemIcon>
                <ListItemText primary={`Programming Language Skills Level: ${employee.fields.programming_skills_level}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={`Language Skills: ${employee.fields.language_skills.join(', ')}`} />
              </ListItem>
              <ListItem>
              <ListItemIcon>
                  <TranslateIcon />
                </ListItemIcon>
                <ListItemText primary={`Language Skills Level: ${employee.fields.language_skills_level}`} />
              </ListItem>
              <Button variant="outlined" color="primary" onClick={() => handleUpdate(employee)}>
                Update
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(employee.fields.employee_id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EmployeeList;
