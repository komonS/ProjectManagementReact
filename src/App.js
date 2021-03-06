import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './component/content/Home'
import Header from './component/layout/Header'
import Sidebar from './component/layout/Sidebar'
import Footer from './component/layout/Footer'
import Control from './component/layout/Control'
import Login from './component/content/Login'
import TaskView from './component/content/TaskView'
import TaskAdd from './component/content/TaskAdd'
import ProjectAdd from './component/content/ProjectAdd'
import ProjectManage from './component/content/ProjectManage'
import ProjectView from './component/content/ProjectView'
import SubprojectManage from './component/content/SubprojectManage'
import TaskAll from './component/content/TaskAll'
import ProjectTable from './component/content/ProjectTable'
import Profile from './component/content/Profile'
import Register from './component/content/Register'
import Group from './component/content/Group'
function App() {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content">
          <Switch>
            <Route path="/group">
              <Group />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/project/table/:id">
              <ProjectTable />
            </Route>
            <Route path="/task/table/:id">
              <TaskAll />
            </Route>
            <Route path="/subproject/manage/:id/:subID">
              <SubprojectManage />
            </Route>
            <Route path="/project/new">
              <ProjectAdd />
            </Route>
            <Route path="/project/view/:id">
              <ProjectView />
            </Route>
            <Route path="/project/manage/:id">
              <ProjectManage />
            </Route>
            <Route path="/task/new">
              <TaskAdd />
            </Route>
            <Route path="/task/view/:id">
              <TaskView />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </section>
      </div>
      <Footer />
      <Control />
    </div>
  );
}

export default App;
