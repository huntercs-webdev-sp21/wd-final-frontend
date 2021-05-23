import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import axios from "axios";


const StudentRow = ({student, showCampus}) => {
  const handleClick = (e) => {
    axios.put(`/api/students/${student.id}`, {
      campusId: null,
    })
      .then(() => window.location.reload());

  };
  return (
    <Box key={student.id} m={1} p={1} border="1px solid black">
      <img width={200} src={student.image} />
      <Box display="flex" flexDirection="column">
        <Link to={`/student/${student.id}`}>
          <h3>{student.firstName} {student.lastName}</h3>
        </Link>
      <Button style={{backgroundColor: "#21b6ae"}} onClick={handleClick}> Remove from campus </Button>
      </Box>
    </Box>
  );
};

StudentRow.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentRow;
