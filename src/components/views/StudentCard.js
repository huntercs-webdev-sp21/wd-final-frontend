import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

const StudentCard = ({student, showCampus}) => {
  return (
    <Box key={student.id} m={1} p={1} border="1px solid black">
      <img width={200} src={student.image} />
      <Box display="flex" flexDirection="column">
        <Link to={`/student/${student.id}`}>
          <h3>{student.firstName} {student.lastName}</h3>
        </Link>
        {showCampus ? 
        <span>{student.campus ? (
          <Link to={`/campus/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        ) : 'No campus'}</span>
        : null}
      </Box>
    </Box>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentCard;
