import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  DeleteCampusContainer,
  DeleteStudentContainer,
  EditCampusContainer,
  EditStudentContainer,
  AddCampusContainer,
  AddStudentContainer,
} from './components/containers';

// if you create separate components for adding/editing 
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route path="/delete/campus/:id" component={DeleteCampusContainer} />
        <Route path="/edit/campus/:id" component={EditCampusContainer} />
        <Route path="/new/campus" component={AddCampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route path="/delete/student/:id" component={DeleteStudentContainer} />
        <Route path="/edit/student/:id" component={EditStudentContainer} />
        <Route path="/new/student" component={AddStudentContainer} />
      </Switch>
    </div>
  );
}

export default App;
