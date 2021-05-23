import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { PageContainer } from "../containers";

const AllCampusesView = (props) => {
  return (
    <PageContainer>
      <Box display="flex" alignItems="center" flexDirection="column">
        <h1>Campuses</h1>
        <Link to="/new/campus">
          <Button variant="contained" color="primary">Add Campus</Button>
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        {props.allCampuses.length === 0 ? <Box p={2}>There are no campuses registered</Box> :
        props.allCampuses.map((campus) => (
          <Box key={campus.id} m={1} p={1} border="1px solid black">
            <img width={200} src={campus.image} />
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
        ))}
      </Box>
    </PageContainer>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
