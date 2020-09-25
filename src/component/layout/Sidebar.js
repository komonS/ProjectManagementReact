import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
function Sidebar() {
  const { login } = useContext(LoginContext)

  const Logined = () => {
    return <ul className="sidebar-menu" data-widget="tree">
      <li className="header">MAIN NAVIGATION</li>
      <li>
        <Link to="/">
          <i className="fa fa-dashboard"></i> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/project/new">
          <i className="fa  fa-plus"></i> <span>New Project</span>
        </Link>
      </li>
      <li>
        <Link to="/task/new">
          <i className="fa  fa-plus"></i> <span>New Task</span>
        </Link>
      </li>
    </ul>
  }

  const NonLogin = () => {
    return <ul className="sidebar-menu" data-widget="tree">
      <li className="header">Plase Login</li>
    </ul>
  }

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        {login ? <Logined /> : <NonLogin />}
      </section>
    </aside>
  );
}

export default Sidebar;
