import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

const CampusCard = ({campus}) => {
  if(!campus){
    return "No campus";
  }
  return (
    <Box key={campus.id} m={1} p={1} border="1px solid black">
      <img alt="Student" width={200} src={campus.image} />
      <Box display="flex" flexDirection="column">
        <Link to={`/campus/${campus.id}`}>
          <h3>{campus.name}</h3>
        </Link>
        <span>{campus.description}</span>
        <span>{campus.students.length} students</span>
        <Box display="flex" justifyContent="space-between" m={1}>
          <Link to={`/edit/campus/${campus.id}`}>
            <Button variant="contained" color="primary">Edit</Button>
          </Link>
          <Link to={`/delete/campus/${campus.id}`}>
            <Button variant="contained" color="secondary">Delete</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

CampusCard.propTypes = {
  campus: PropTypes.object.isRequired,
};

export default CampusCard;
