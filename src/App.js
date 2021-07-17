import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Pages/Login";
import EditorPage from "./components/Editorpages/EditorPage";
import WriterPage from "./components/Pages/WriterPage";
import SignUp from "./components/Pages/Signup";

function App() {
  return (
    // <div>
    //   <Login/>
    // </div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/" component={Login} />
        <Route exact path="/EditorPage012" component={EditorPage} />
        <Route exact path="/WriterPage013" component={WriterPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
