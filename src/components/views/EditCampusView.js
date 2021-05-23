import { useState } from "react";
import { Box, Button, Grid, TextField, MenuItem, Select  } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PageContainer } from "../containers";
import StudentRow from './StudentRow.js';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const EditCampusView = ({campus, allStudents}) => {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [name, setName] = useState(campus.name);
  const [address, setAddress] = useState(campus.address);
  const [image, setImage] = useState(campus.image);
  const [description, setDescription] = useState(campus.description);
  const [selectedStudent, setSelectedStudent] = useState();

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {
        name: name,
        address: address,
        description: description
      };
    if(image) {
        params.image = image;
      }
      axios.put(`/api/campuses/${campus.id}`,params)
        .then((res) => history.push("/campus/" + res.data.id));
  };

  const handleStudentSelect = (e) => {
    setSelectedStudent(e.target.value);
  };


  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    console.log('submit', selectedStudent);
    axios.put(`/api/students/${selectedStudent}`, {
      campusId: campus.id
    })
      .then(() => window.location.reload());
  };

  if (!campus || !allStudents) {
    return <div>Loading...</div>;
  }



  return (

    <PageContainer>
      <Box display="flex" alignItems="center" flexDirection="column" width={1000} margin="auto" pt={4}>
        {campus === undefined || campus.id === undefined ? <Box m={2}>Loading...</Box> : (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    label="Campus Name"
                    placeholder="Campus Name"
                    variant="outlined"
                    required
                    fullWidth
                    defaultValue={campus.name}
                    onChange={updateName}
                  />
                  <br/> <br/>
                  <TextField
                    type="text"
                    label="Campus Location"
                    placeholder="Campus Location"
                    variant="outlined"
                    required
                    fullWidth
                    defaultValue={campus.address}
                    onChange={updateAddress}
                  />
                  <br/> <br/>
                  <TextField
                    type="text"
                    label="Campus Image Url (Optional)"
                    placeholder="Campus Image Url (Optional)"
                    variant="outlined"
                    fullWidth
                    defaultValue={campus.image}
                    onChange={updateImage}
                  />
                  <br/> <br/>
                  <TextField
                    multiline={true}
                    rows={5}
                    type="text"
                    label="Campus Description"
                    placeholder="Campus Description)"
                    variant="outlined"
                    fullWidth
                    required
                    defaultValue={campus.description}
                    onChange={updateDescription}
                  />
                  <br/> <br/>
                  {error && <h2> {error} </h2> }
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </form>
              </Grid>
            </Grid>
            <form onSubmit={handleAddStudentSubmit}>
              {console.log(allStudents)}
          <Select fullWidth onChange={handleStudentSelect}>
            <MenuItem label=" "></MenuItem>
            { allStudents && allStudents.map((student, i) => <MenuItem key={i} value={student.id}>{`${student.firstName} ${student.lastName}`}</MenuItem>) }
          </Select> <br />
              <Button type="submit" variant="contained" color="primary">Add Student</Button>
        </form>
            <h1>Students on campus</h1>
            {campus.students.length === 0 ? <Box p={2}>No students to show</Box> : (
              campus.students.map(student => <StudentRow key={student.id} student={student} />)
            )}
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default EditCampusView;
