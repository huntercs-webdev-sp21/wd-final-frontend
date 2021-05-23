import { Box, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PageContainer } from "../containers";
import StudentCard from './StudentCard.js';

const CampusView = ({campus}) => {
  return (
    <PageContainer>      
      <Box display="flex" alignItems="center" flexDirection="column" width={1000} margin="auto" pt={4}>
        {campus === undefined ? <Box m={2}>Loading...</Box> : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img alt="Campus" src={campus.image} style={{"maxWidth":"100%"}} />
                <p>{campus.address}</p>
              </Grid>
              <Grid item xs={6}>
                <h1>{campus.name}</h1>
                <p>{campus.description}</p>
                <Link to={`/edit/campus/${campus.id}`}>
                  <Button variant="contained" color="primary">Edit</Button>
                </Link>
                <Link to={`/delete/campus/${campus.id}`}>
                  <Button variant="contained" color="secondary">Delete</Button>
                </Link>
              </Grid>
            </Grid>
            <h1>Students on campus</h1>
            <Link to={`/edit/campus/${campus.id}`}>
              <Button variant="contained" color="primary">Add Students</Button>
            </Link>
            <Box display="flex" flexWrap="wrap">
              {campus.students.length === 0 ? <Box p={2}>No students to show</Box> : (
                campus.students.map(student => <StudentCard key={student.id} student={student} />)
              )}
            </Box>
            </>
        )}
      </Box>
    </PageContainer>
  );
};

export default CampusView;
