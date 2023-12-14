import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid, MenuItem, Select, InputLabel } from '@mui/material';
import { useEmployeeContext } from './EmployeeContext';
import {styled} from '@mui/system';


const CreateEmployee = () => {

  const {register, setForm, reset, updateEmployees, selectedEmployee, update}=useEmployeeContext();

  const [formData, setFormData] = useState({
    employee_id: '',
    employee_code: '',
    dob: '',
    designation: '',
    gender: '',
    language_skills_level: '',
    programming_skills: [],
    programming_skills_level:'',
    language_skills: [],
  });
  const [genderChoices, setGenderChoices] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skillLevelChoices, setSkillLevelChoices] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "programming_skills" || name === "language_skills") {
      // Convert the value to an array
      const updatedValue = Array.isArray(value) ? value : [value];
  
      // Update the formData state with the array value or an empty array for deselection
      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name].includes(value)
          ? prevData[name].filter((item) => item !== value) // Deselect the value
          : [...prevData[name], ...updatedValue], // Select the value
      }));
    } else {
      // For other fields, update the formData state normally
      setFormData({ ...formData, [name]: value });
    }
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

  useEffect(() => {
    // Check if there is a selected employee for updating
    if (selectedEmployee) {
      // Set form values for updating
      setIsUpdate(true);
      //this is to change the form's looks
     
      setFormData({
        employee_id: selectedEmployee.fields.employee_id,
        employee_code: selectedEmployee.fields.employee_code,
        dob: selectedEmployee.fields.dob,
        designation: selectedEmployee.fields.designation,
        gender: selectedEmployee.fields.gender,
        programming_skills: selectedEmployee.fields.programming_skills || [],
        language_skills: selectedEmployee.fields.language_skills || [],
        programming_skills_level: selectedEmployee.fields.programming_skills_level || '',
        language_skills_level: selectedEmployee.fields.language_skills_level || '',
      });
      console.log("updated");
    }
  }, [selectedEmployee]);

  const handleSubmit = () => {
    // Convert programming_skills and language_skills to arrays
    const programmingSkillsArray = formData.programming_skills;
    const languageSkillsArray = formData.language_skills;
  
    // Create a FormData object
    const formDataObject = new FormData();
  
    // Append each field to the FormData object
    formDataObject.append('employee_id', formData.employee_id);
    formDataObject.append('employee_code', formData.employee_code);
    formDataObject.append('dob', formData.dob);
    formDataObject.append('designation', formData.designation);
    formDataObject.append('gender', formData.gender);
  
    // Append arrays directly to FormData
    programmingSkillsArray.forEach((language) => {
      formDataObject.append('programming_skills', language);
    });
  
    languageSkillsArray.forEach((programmingLanguage) => {
      formDataObject.append('language_skills', programmingLanguage);
    });
  
    formDataObject.append('programming_skills_level', formData.programming_skills_level);
    formDataObject.append('language_skills_level', formData.language_skills_level);
    
    if (isUpdate) {
      // Call the update function from the context
      update({fields:formData});
      reset(); // Reset the form
    }

    else{
      axios.post('http://localhost:8000/api/create_employee/', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(response => {
          // Handle success, e.g., show a success message or redirect
          console.log('Employee created successfully:', response.data);
          const newEmployeeData = response.data.data;
          updateEmployees(newEmployeeData);
          reset();
        })
        .catch(error => {
          // Handle error, e.g., show an error message
          console.error('Error creating employee:', error);
          console.log('Error response:', error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
        // Send a POST request to your Django backend to create a new employee

    }
    
   
  };
  
  
  const buttonLabel = isUpdate ? 'Update Employee' : 'Create Employee';


  

   

  return (
    <Container>
      <h1>{buttonLabel}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Employee ID"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            InputProps={{
              style: { color: 'white', borderColor: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
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
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
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
            name="employee_code"
            value={formData.employee_code}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: { color: 'white', borderColor: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
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
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
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
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="language-skills" style={{color:'white'}}>Language Skills</InputLabel>
          <Select
            label="Language Skills"
            name="language_skills"
            value={formData.language_skills}
            onChange={handleChange}
            fullWidth
            multiple
            style={{ color: 'white', borderColor: 'white' }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
            
            
          >
            {languages.map((language) => (
              <MenuItem key={language[0]} value={language[0]}>
                {language[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="programming-skills" style={{color:'white'}}>Programming Languages</InputLabel>
          <Select
            label="Programming Languages"
            name="programming_skills"
            value={formData.programming_skills}
            onChange={handleChange}
            fullWidth
            multiple
            style={{ color: 'white', borderColor: 'white' }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
            
          >
            {programmingLanguages.map((language) => (
              <MenuItem key={language[0]} value={language[0]}>
                {language[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="language-skills-level" style={{color:'white'}}>Language Skills Level</InputLabel>
          <Select
            label="Language Skills Level"
            name="language_skills_level"
            value={formData.language_skills_level}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
            
          >
            {skillLevelChoices.map((choice) => (
              <MenuItem key={choice[0]} value={choice[0]}>
                {choice[1]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="programming-skills-level" style={{color:'white'}}>Programming Language Skills Level</InputLabel>
          <Select
            label="Programming Language Skills Level"
            name="programming_skills_level"
            value={formData.programming_skills_level}
            onChange={handleChange}
            fullWidth
            style={{ color: 'white', borderColor: 'white' }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
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
        {buttonLabel}
      </Button>
    </Container>
  );
};

export default CreateEmployee;