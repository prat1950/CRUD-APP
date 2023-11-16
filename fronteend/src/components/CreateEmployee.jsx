import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid, MenuItem, Select, InputLabel } from '@mui/material';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeCode: '',
    dob: '',
    designation: '',
    gender: '',
    languageSkillsLevel: '',
    programmingSkills: [],
    languageSkills: [],
  });
  const [genderChoices, setGenderChoices] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skillLevelChoices, setSkillLevelChoices] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Fetch choices from Django backend
    axios.get('http://localhost:8000/api/choices/')
      .then(response => {
        setGenderChoices(response.data.gender_choices);
        setProgrammingLanguages(response.data.programming_languages);
        setLanguages(response.data.languages);
        setSkillLevelChoices(response.data.skill_level_choices);
      })
      .catch(error => {
        console.error('Error fetching choices:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Send a POST request to your Django backend to create a new employee
    console.log(formData);
    axios.post('http://localhost:8000/api/create_employee/', formData)
      .then(response => {
        // Handle success, e.g., show a success message or redirect
        console.log('Employee created successfully:', response.data);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error creating employee:', error);
        console.log('Error response:', error.response);
      });
  };

  return (
    <Container>
      <h1>Create Employee</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            InputProps={{
              style: { color: 'white', borderColor: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            InputProps={{
              style: { color: 'white', borderColor: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          >
            {genderChoices.map((choice) => (
              <MenuItem key={choice[0]} value={choice[0]}>
                {choice[1]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Employee Code"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: { color: 'white', borderColor: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            InputProps={{
              style: { color: 'white', borderColor: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            InputProps={{
              style: { color: 'white', borderColor: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="language-skills">Language Skills</InputLabel>
          <Select
            label="Language Skills"
            name="languageSkills"
            value={formData.languageSkills}
            onChange={handleChange}
            fullWidth
            multiple
            style={{ color: 'white', borderColor: 'white' }}
            
            
          >
            {languages.map((language) => (
              <MenuItem key={language[0]} value={language[0]}>
                {language[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="programming-skills">Programming Languages</InputLabel>
          <Select
            label="Programming Languages"
            name="programmingSkills"
            value={formData.programmingSkills}
            onChange={handleChange}
            fullWidth
            multiple
            style={{ color: 'white', borderColor: 'white' }}
            
          >
            {programmingLanguages.map((language) => (
              <MenuItem key={language[0]} value={language[0]}>
                {language[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="language-skills-level">Language Skills Level</InputLabel>
          <Select
            label="Language Skills Level"
            name="languageSkillsLevel"
            value={formData.languageSkillsLevel}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            
          >
            {skillLevelChoices.map((choice) => (
              <MenuItem key={choice[0]} value={choice[0]}>
                {choice[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="programming-skills-level">Programming Language Skills Level</InputLabel>
          <Select
            label="Programming Language Skills Level"
            name="programmingSkillsLevel"
            value={formData.programmingSkillsLevel}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            inputProps={{
              style: { color: 'white' },
            }}
          >
            {skillLevelChoices.map((choice) => (
              <MenuItem key={choice[0]} value={choice[0]}>
                {choice[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '20px', backgroundColor: 'white', color: 'black' }}
      >
        Create Employee
      </Button>
    </Container>
  );
};

export default CreateEmployee;