import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class DeleteCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false};
  }

  render = () => {
    axios.delete(`/api/campuses/${this.props.match.params.id}`)
      .then(() => this.setState({redirect:true}));
    return (
      this.state.redirect ? <Redirect to="/campuses" /> : <div />
    );
  }
};

export default DeleteCampusContainer;
