import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pages from "./pages";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import WindowEvents from "./utils/WindowEvents";
import dotenv from "dotenv";

let GlobalContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowEvents: new WindowEvents(),
      auth: false
    };
    dotenv.config({ path: "../.env" });
  }

  componentDidMount() {
    Axios(`/api/current_user`)
      .then(res => {
        this.setState({
          auth: res.data || false,
          error: null
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            error: err.response.status
          });
        } else {
          this.setState({
            error: 500
          });
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    console.log(process.env.REACT_APP_TEST, "12");
    return (
      <GlobalContext.Provider value={{ windowEvents: this.state.windowEvents }}>
        <Router>
          <React.Fragment>
            <Nav />
            <Main>
              <Switch>
                <Route exact path="/" component={Pages.HomePage} />
                <Route
                  path="/course/:shortTitle"
                  component={Pages.CoursePage}
                />
                <Route path="/java" component={Pages.JavaPage} />
                <Route path="/account" component={Pages.AccountPage} />
                <Route path="/contact" component={Pages.ContactPage} />
                <Route component={Pages.NotFoundPage} />
              </Switch>
            </Main>
            <Footer />
          </React.Fragment>
        </Router>
      </GlobalContext.Provider>
    );
  }
}

export default App;
export { GlobalContext };
