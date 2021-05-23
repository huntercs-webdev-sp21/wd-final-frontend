import { useState } from "react";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { PageContainer } from "../containers";
import { useHistory } from 'react-router-dom';
import CampusCard from "./CampusCard.js";

const EditStudentView = ({student, allCampuses}) => {
  const [selectedCampus, setSelectedCampus] = useState();
  let history = useHistory();
  const [error, setError] = useState(null);
  const [firstname, setFirstname] = useState(student.firstName);
  const [lastname, setLastname] = useState(student.lastName);
  const [email, setEmail] = useState(student.email);
  const [gpa, setGPA] = useState(student.gpa);
  const [image, setImage] = useState(student.image);

  if (!student || !allCampuses || (student.campus && allCampuses.length === 0) ) {
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
        gpa: gpa
      };
      if(image) {
        params.image = image;
      }
      axios.put(`/api/students/${student.id}`,params)
        .then((res) => history.push("/student/" + res.data.id));
    }
  };

  const handleChangeCampusSubmit = (e) => {
    e.preventDefault();
    console.log('submit', selectedCampus);
    axios.put(`/api/students/${student.id}`, {
      campusId: selectedCampus
    })
      .then(() => window.location.reload());
  };

  let campus;
  if (student.campus) {
    campus = (
      <div>
        <h3>This student is registered to a campus</h3>
        <Box display="flex" justifyContent="space-between">
          <CampusCard campus={allCampuses.find(c => c.id === student.campus.id)} />
          <div>
            <form onSubmit={handleChangeCampusSubmit}>
              <Select fullWidth onChange={handleChange} placeholder="Select a campus">
                <MenuItem label=" "></MenuItem>
                { allCampuses && allCampuses.map((campus, i) => <MenuItem key={i} value={campus.id}>{campus.name}</MenuItem>) }
              </Select> <br />
              <Button type="submit" variant="contained" color="primary">Change Campus</Button>
            </form>
          </div>
        </Box>
      </div>
    );
  } else {
    campus = (
      <div>
        <h3>This student is not registered to a campus</h3>
        <form onSubmit={handleChangeCampusSubmit}>
          <Select fullWidth onChange={handleChange}>
            <MenuItem label=" "></MenuItem>
            { allCampuses && allCampuses.map((campus, i) => <MenuItem key={i} value={campus.id}>{campus.name}</MenuItem>) }
          </Select> <br />
          <Button type="submit" variant="contained" color="primary">Add Campus</Button>
        </form>
      </div>
    );
  }

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" flexDirection="column" width={1000} margin="auto" pt={4}>
        {student === undefined ? <Box m={2}>Loading...</Box> : (
          <>
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
                    defaultValue={student.firstName}
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
                    defaultValue={student.lastName}
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
                    defaultValue={student.email}
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
                    defaultValue={student.gpa}
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
                    defaultValue={student.image}
                    onChange={updateImage}
                   />
                  <br/> <br/>
                  {error && <h2> {error} </h2> }
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </form>
              </Grid>
            </Grid>
            {campus}
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default EditStudentView;
