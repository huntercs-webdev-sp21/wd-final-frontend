import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { PageContainer } from "../containers";
import StudentCard from './StudentCard.js';

const AllStudentsView = (props) => {
  return (
    <PageContainer>
      <Box display="flex" alignItems="center" flexDirection="column">
        <h1>Students</h1>
        <Link to="/new/student">
          <Button variant="contained" color="primary">Add Student</Button>
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        {props.allStudents.length === 0 ? <Box m={2}>There are no students registered</Box> :
        props.allStudents.map((student) => <StudentCard student={student} showCampus />)}
      </Box>
    </PageContainer>
  );
};

AllStudentsView.propTypes = {
  allStudents: PropTypes.array.isRequired,
};

export default AllStudentsView;
