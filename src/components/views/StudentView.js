import { useState } from "react";
import { Box, Button, Grid, MenuItem, Select } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { PageContainer } from "../containers";
import CampusCard from "./CampusCard.js";

const StudentView = ({student, allCampuses}) => {
  const [selectedCampus, setSelectedCampus] = useState();

  if (!student || !allCampuses || (student.campus && allCampuses.length === 0) ) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setSelectedCampus(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/students/${student.id}`, {
      campusId: selectedCampus
    })
      .then(() => window.location.reload());
  }

  let campus;
  if (student.campus) {
    campus = (
      <div>
        <h3>This student is registered to a campus</h3>
        <Box display="flex" justifyContent="space-between">
          <CampusCard campus={allCampuses.find(c => c.id === student.campus.id)} />
          <div>
            <form onSubmit={handleSubmit}>
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
        <form onSubmit={handleSubmit}>
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img alt="Student" src={student.image} style={{"maxWidth":"100%"}} />
              </Grid>
              <Grid item xs={6}>
                <h1>{student.firstName} {student.lastName}</h1>
                <p>GPA: {student.gpa}</p>
                <Link to={`/edit/student/${student.id}`}>
                  <Button variant="contained" color="primary">Edit</Button>
                </Link>
                <Link to={`/delete/student/${student.id}`}>
                  <Button variant="contained" color="secondary">Delete</Button>
                </Link>
              </Grid>
            </Grid>
            {campus}
            </>
        )}
      </Box>
    </PageContainer>
  );
};

export default StudentView;
