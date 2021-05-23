import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, fetchAllCampusesThunk } from "../../store/thunks";

import { EditStudentView } from "../views";

class EditStudentContainer extends Component {
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <EditStudentView
        student={this.props.student}
        allCampuses={this.props.allCampuses}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    student: state.student,
    allCampuses: state.allCampuses,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
