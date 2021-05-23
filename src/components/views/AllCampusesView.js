import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { PageContainer } from "../containers";
import CampusCard from './CampusCard.js';

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
          <CampusCard key={campus.id} campus={campus} />
        ))}
      </Box>
    </PageContainer>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
