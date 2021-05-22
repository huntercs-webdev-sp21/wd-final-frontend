import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { PageContainer } from "../containers";

const AllStudentsView = (props) => {
  return (
    <PageContainer>
      <Box display="flex" justifyContent="center">
        {props.allStudents.length === 0 ? <Box m={2}>There are no students registered</Box> :
        props.allStudents.map((student) => (
          <Box key={student.id} m={1} p={1} border="1px solid black">
            <img width={200} src={student.image} />
            <Box display="flex" flexDirection="column">
              <Link to={`/student/${student.id}`}>
                <h3>{student.firstName} {student.lastName}</h3>
              </Link>
              <span>{student.campus ? student.campus.name : 'No campus'}</span>
            </Box>
          </Box>
        ))}
      </Box>
    </PageContainer>
  );
};

AllStudentsView.propTypes = {
  allStudents: PropTypes.array.isRequired,
};

export default AllStudentsView;
