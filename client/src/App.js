import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Profile } from "./components/profile";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Register} exact path="/register" />
        <Route component={Login} exact path="/login" />
        <Route component={ProfilePage} exact path="/u/:userId" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
