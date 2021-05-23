import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllCampusesThunk } from "../../store/thunks";

import { AddStudentView } from "../views";

class AddStudentContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <AddStudentView
        allCampuses={this.props.allCampuses}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
  };
};

export default connect(mapState, mapDispatch)(AddStudentContainer);

