import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UrlProvider } from './store/UrlProvider'
import { LoginProvider } from './store/LoginProvider'
import { UserProvider } from './store/UserProvider'
import { TeamProvider } from './store/TeamProvider'
import { SubprojectProvider } from './store/SubprojectProvider'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <UrlProvider>
          <UserProvider>
            <TeamProvider>
              <SubprojectProvider>
                <App />
              </SubprojectProvider>
            </TeamProvider>
          </UserProvider>
        </UrlProvider>
      </LoginProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
