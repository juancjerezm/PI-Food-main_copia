import "./App.css";
import { Route } from "react-router-dom";
import { Home, LandingPage, Detail, Form } from "./components/Views";


function App() {
  // const location = useLocation();
  return (
    <div className="App" style={{ height: "100%" }}>
      

      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/home/:idRecipe">
        <Detail />
      </Route>
      <Route exact path="/create">
        <Form />
      </Route>
    </div>
  );
}

export default App;
