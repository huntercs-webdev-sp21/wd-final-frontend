import { useState } from "react";
import { Box, Button, Grid, TextField, MenuItem, Select  } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PageContainer } from "../containers";
import StudentRow from './StudentRow.js';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const AddCampusView = () => {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {
      name: name,
      address: address,
      description: description
    };
    if(image) {
      params.image = image;
    }
    axios.post("/api/campuses",params)
      .then((res) => history.push("/campus/" + res.data.id))
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" flexDirection="column" width={1000} margin="auto" pt={4}>
        <h1>Add Campus</h1>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Campus Name"
                placeholder="Campus Name"
                variant="outlined"
                required
                fullWidth
                onChange={updateName}
                />
              <br/> <br/>
              <TextField
                type="text"
                label="Campus Location"
                placeholder="Campus Location"
                variant="outlined"
                required
                fullWidth
                onChange={updateAddress}
                />
              <br/> <br/>
              <TextField
                type="text"
                label="Campus Image Url (Optional)"
                placeholder="Campus Image Url (Optional)"
                variant="outlined"
                fullWidth
                onChange={updateImage}
                />
              <br/> <br/>
              <TextField
                multiline={true}
                rows={5}
                type="text"
                label="Campus Description"
                placeholder="Campus Description)"
                variant="outlined"
                fullWidth
                required
                onChange={updateDescription}
                />
              <br/> <br/>
              {error && <h2> {error} </h2> }
              <Button type="submit" variant="contained" color="primary">
              Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AddCampusView;
