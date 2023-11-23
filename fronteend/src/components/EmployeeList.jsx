import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import WcIcon from '@mui/icons-material/Wc';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import { useEmployeeContext } from './EmployeeContext';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [choices, setChoices] = useState({});
  const [fetchDataFlag, setFetchDataFlag] = useState(true);

  const {emp}=useEmployeeContext();
  

  useEffect(() => {
    
      fetchData();
      
    
  }, [emp]);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/employee_list/')
      .then(response => {
        const decodedData = JSON.parse(response.data.data);
        setEmployees(decodedData);
        setChoices(response.data.choices);
      })
      .catch(error => console.error(error));
  };

  

  return (
    <Grid container spacing={2}>
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
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={`Language Skills: ${employee.fields.language_skills.join(', ')}`} />
              </ListItem>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EmployeeList;
