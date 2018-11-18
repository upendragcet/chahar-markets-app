import React, { Component } from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import configureStore from '../src/store/Store';
import Home from '../src/containers/Home';
import AppTheme from './AppTheme';
const store = configureStore();

export default class App extends Component {
  render() {
    const {user_id} = this.props;
    return (
      <Provider store={store}>
        <Router>
          <AppTheme>
            <Switch>
              <Route path={ "/" } component={() => <Home locale='en' user_id={user_id} />} />
            </Switch>
          </AppTheme>
        </Router>
      </Provider>
    );
  }
}

ReactOnRails.register({ App });
