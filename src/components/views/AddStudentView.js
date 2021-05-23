import { useState } from "react";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import axios from "axios";
import { PageContainer } from "../containers";
import { useHistory } from 'react-router-dom';

const AddStudentView = ({allCampuses}) => {
  const [selectedCampus, setSelectedCampus] = useState();
  let history = useHistory();
  const [error, setError] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [gpa, setGPA] = useState('');
  const [image, setImage] = useState('');

  if (!allCampuses) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setSelectedCampus(e.target.value);
  };

  const updateFirst = (e) => {
    setFirstname(e.target.value);
  };

  const updateLast = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateGPA = (e) => {
    setGPA(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      console.log(gpa);
      setError("GPA must be between 0 and 4");
    } else {
      setError(null);
      let params = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        gpa: gpa,
      };
      if(image) {
        params.image = image;
      }
      if(selectedCampus) {
        params.campusId = selectedCampus;
      }
      axios.post("/api/students/",params)
        .then((res) => history.push("/student/" + res.data.id))
        .catch((err) => setError(err.response.data.message));
    }
  };

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" flexDirection="column" width={1000} margin="auto" pt={4}>
        <h1>Add Student</h1>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Student First Name"
                placeholder="Student First tName"
                variant="outlined"
                required
                fullWidth
                onChange={updateFirst}
                />
              <br/> <br/>
              <TextField
                type="text"
                label="Student Last Name"
                placeholder="Student Last tName"
                variant="outlined"
                required
                fullWidth
                onChange={updateLast}
                />
              <br/> <br/>
              <TextField
                type="email"
                label="Student Email"
                placeholder="Student Email"
                variant="outlined"
                required
                fullWidth
                onChange={updateEmail}
                />
              <br/> <br/>
              <TextField
                type="number"
                label="Student GPA"
                placeholder="Student GPA"
                variant="outlined"
                required
                fullWidth
                onChange={updateGPA}
                inputProps={{ min: "0", max: "4", step: "any" }}
                />
              <br/> <br/>
              <TextField
                type="text"
                label="Student Image Url (Optional)"
                placeholder="StudentView Image Url (Optional)"
                variant="outlined"
                fullWidth
                onChange={updateImage}
                />
              <br/> <br/>
              <Select fullWidth onChange={handleChange} placeholder="Select a campus">
                <MenuItem label=" "></MenuItem>
                { allCampuses.map((campus, i) => <MenuItem key={i} value={campus.id}>{campus.name}</MenuItem>) }
              </Select>
              <br/> <br/>
              {error && <h2> {error} </h2> }
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AddStudentView;

